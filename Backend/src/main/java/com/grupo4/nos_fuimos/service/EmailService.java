package com.grupo4.nos_fuimos.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;

import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void enviarCorreoConfirmacion(String email, String nombreUsuario) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(email);
        helper.setSubject("Asunto del correo electrónico");

        // Procesar la plantilla HTML con el nombre de usuario proporcionado
        String htmlBody = htmlConfirmacion(email, nombreUsuario);
        helper.setText(htmlBody, true);

        emailSender.send(message);
    }

    private String htmlConfirmacion(String email, String nombreUsuario) {
        Context context = new Context();
        context.setVariable("nombreUsuario", nombreUsuario);
        context.setVariable("email", email);
        return templateEngine.process("confirmacion", context);
    }


    public void enviarCorreoReserva(String email, String nombreUsuario) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(email);
        helper.setSubject("Asunto del correo electrónico");

        // Procesar la plantilla HTML con el nombre de usuario proporcionado
        String htmlBody = buildHtmlBody(email, nombreUsuario);
        helper.setText(htmlBody, true);

        emailSender.send(message);
    }

    private String buildHtmlBody(String email, String nombreUsuario) {
        Context context = new Context();
        context.setVariable("nombreUsuario", nombreUsuario);
        context.setVariable("email", email);
        return templateEngine.process("confirmacion", context);
    }

}