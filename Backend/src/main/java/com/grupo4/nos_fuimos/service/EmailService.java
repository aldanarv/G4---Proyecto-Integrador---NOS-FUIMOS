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

    public void enviarCorreoConfirmacion(String destinatario) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(destinatario);
            helper.setSubject("Confirmación de registro");
            String htmlContent = cargarTemplate();
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            // Manejar la excepción
        }
        emailSender.send(message);
    }

    private String cargarTemplate() {
        Context context = new Context();
        return templateEngine.process("confirmacion", context);
    }
}