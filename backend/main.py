from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from dotenv import load_dotenv
import os

#Para el formulario
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

#Para recibir datos del formulario en correo de empresa
import smtplib
from email.message import EmailMessage


load_dotenv()  # Carga el archivo .env

app = FastAPI()

# Ruta base del frontend
#frontend_path = Path(__file__).resolve().parent.parent / "frontend"
frontend_path = Path(__file__).resolve().parent / "../frontend"
frontend_path = frontend_path.resolve()
print(f"📁 Ruta FRONTEND en Render: {frontend_path}")


# Montar carpetas estáticas
app.mount("/styles", StaticFiles(directory=frontend_path / "styles"), name="styles")
app.mount("/JS", StaticFiles(directory=frontend_path / "JS"), name="js")
app.mount("/IMG", StaticFiles(directory=frontend_path / "IMG"), name="img")

# Montar favicon como archivo estático
@app.get("/favicon.ico")
async def get_favicon():
    favicon_path = frontend_path / "IMG" / "favicon.ico"
    if favicon_path.exists():
        return FileResponse(favicon_path)
    raise HTTPException(status_code=404, detail="Favicon no encontrado")

# Página Principal

@app.get("/", response_class=HTMLResponse)
async def serve_index():
    file_path = frontend_path / "html" / "index.html"
    print(f"📄 Buscando archivo: {file_path}")
    print(f"✅ ¿Existe index.html?: {file_path.exists()}")
    
    if file_path.exists() and file_path.is_file():
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Página principal no encontrada")

# Rutas dinámicas para otras páginas HTML
@app.get("/{page_name}", response_class=HTMLResponse)
async def serve_page(page_name: str):
    # Validar que el archivo termine en .html para mayor seguridad
    if not page_name.endswith(".html"):
        raise HTTPException(status_code=400, detail="Archivo no válido")
    
    file_path = frontend_path / "html" / page_name
    if file_path.exists() and file_path.is_file():
        return FileResponse(file_path)
    
    raise HTTPException(status_code=404, detail="Página no encontrada")

#Formulario

#Recibir datos del formulario a correo de empresa
def enviar_email(nombre, telefono, email, texto):
    remitente = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASS")
    destinatario = remitente #puede ser el destinatario que quieras.

    #Correo para la empresa(administrador)
    msg = EmailMessage()
    msg['Subject'] = "Nuevo mensaje del formulario web"
    msg['From'] = remitente
    msg['To'] = destinatario
    msg.set_content(f"""
    Has recibido un nuevo mensaje:

    Nombre: {nombre}
    Teléfono: {telefono}
    Email: {email}
    Mensaje:
    {texto}
    """)
    #Correo de agradecimiento para el usuario
    msg_usuario = EmailMessage()
    msg_usuario['Subject'] = "Gracias por contactarnos"
    msg_usuario['From'] = remitente
    msg_usuario['To'] = email
    msg_usuario.set_content(f"""
Hola {nombre},

Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y te responderemos pronto.

Saludos,
PATLAN DREAM 
""")

    try:
        with smtplib.SMTP_SSL("smtp.ionos.es", 465) as smtp:
            smtp.login(remitente, password)
            smtp.send_message(msg) #envía correo a la empresa
            smtp.send_message(msg_usuario) #envía correo al usuario

        print("✅ Correo enviado correctamente")
    except Exception as e:
        print(f"❌ Error al enviar correo: {e}")

# Permitir conexión desde el frontend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Para pruebas; en producción usa tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear tabla en la base de datos si no existe
def crear_tabla():
    conn = sqlite3.connect("contactos.db")
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS contactos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            telefono TEXT,
            email TEXT NOT NULL,
            texto TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

crear_tabla()

# Ruta para recibir el formulario
@app.post("/enviar_formulario")
async def enviar_formulario(
    nombre: str = Form(...),
    telefono: str = Form(""),
    email: str = Form(...),
    texto: str = Form(...)
):
    
    #Guardar en Base de Datos
    conn = sqlite3.connect("contactos.db")
    c = conn.cursor()
    c.execute("INSERT INTO contactos (nombre, telefono, email, texto) VALUES (?, ?, ?, ?)",
              (nombre, telefono, email, texto))
    conn.commit()
    conn.close()
#Enviar correo
    enviar_email(nombre, telefono, email, texto)

    return {"mensaje": "Formulario enviado y guardado correctamente"}

#Política de cookies
from fastapi import Request
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="backend/templates")

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    cookies_accepted = request.cookies.get("cookiesAccepted", "false")
    return templates.TemplateResponse("index.html", {
        "request": request,
        "show_cookie_banner": cookies_accepted != "true"
    })















