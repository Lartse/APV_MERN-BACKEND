import nodemailer from 'nodemailer'

const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos

    const info = await transport.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria", 
        to: email,
        subject: 'Restablece tu Password',
        text: 'Restablece tu Password',
        html:  `<p> Hola: ${nombre}, has solicitado restablecer tu Password.</p>
                <p>Sigue el siguiente enlace para generar tu nuevo password:
                    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer tu password</a>
                </p>
                <p>Si tu no creaste esta cuenta puedes ignorar este mensaje.</p>
        `
    })
    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailOlvidePassword