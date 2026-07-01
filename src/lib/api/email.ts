import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface LeadMagnetEmail {
  toEmail: string;
  userName: string;
  leadMagnetTitle: string;
  downloadLink: string;
  followUpMessage?: string;
}

export async function sendLeadMagnetEmail(data: LeadMagnetEmail) {
  try {
    const response = await resend.emails.send({
      from: `MiroAgente <${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}>`,
      to: data.toEmail,
      subject: `🎁 Tu acceso a: ${data.leadMagnetTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0284c7;">¡Hola ${data.userName}! 👋</h2>
          <p>¡Gracias por tu interés en crear libertad financiera!</p>
          <p>Tu recurso exclusivo está listo para descargar:</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #082f49; margin-top: 0;">${data.leadMagnetTitle}</h3>
            <p>Este recurso te dará herramientas prácticas para avanzar en tu camino hacia la libertad financiera.</p>
            <a href="${data.downloadLink}" style="display: inline-block; background: #0284c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              📥 Descargar Ahora
            </a>
          </div>
          
          ${data.followUpMessage ? `<p style="color: #666;">${data.followUpMessage}</p>` : ''}
          
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            © 2026 MiroAgente. Todos los derechos reservados.
          </p>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error('Error sending lead magnet email:', error);
    throw error;
  }
}

export async function sendFollowUpSequence(
  toEmail: string,
  userName: string,
  sequenceNumber: number
) {
  const sequences = [
    {
      subject: '💰 La verdad sobre construir riqueza',
      message:
        'No es suerte, es sistema. Los últimos 5 pasos que cambiaron mis finanzas...',
    },
    {
      subject: '📈 Cómo yo pasé de deudas a 6 figuras (paso a paso)',
      message:
        'Te comparto exactamente qué hice, cuándo lo hice, y por qué funcionó...',
    },
    {
      subject: '🚀 ¿Listo para tu consulta?',
      message:
        'Descubre si eres candidato para mi programa de mentoría personalizada. Calendly aquí →',
    },
  ];

  const sequence = sequences[sequenceNumber] || sequences[0];

  try {
    const response = await resend.emails.send({
      from: `MiroAgente <${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}>`,
      to: toEmail,
      subject: sequence.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p>¡Hola ${userName}!</p>
          <p>${sequence.message}</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/leads" style="display: inline-block; background: #0284c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Saber Más
          </a>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error('Error sending follow-up email:', error);
    throw error;
  }
}

export async function sendNotification(
  toEmail: string,
  subject: string,
  message: string
) {
  try {
    const response = await resend.emails.send({
      from: `MiroAgente <${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}>`,
      to: toEmail,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p>${message}</p>
        </div>
      `,
    });

    return response;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
}