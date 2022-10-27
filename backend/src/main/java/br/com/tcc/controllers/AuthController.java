package br.com.tcc.controllers;

import java.nio.ByteBuffer;

import com.amazonaws.services.rekognition.model.Image;
import com.amazonaws.util.IOUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.tcc.dtos.MessageDTO;
import br.com.tcc.models.Customer;
import br.com.tcc.services.CustomerService;
import br.com.tcc.services.AmazonRekognitionService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private CustomerService customerService;

    @Autowired
    private AmazonRekognitionService amazonService;

    @PostMapping
    public ResponseEntity<?> authenticate(@RequestParam("email") String email, @RequestParam("photo") MultipartFile file) {
        try {
            Image image = new Image();
            ByteBuffer byteBuffer = ByteBuffer.wrap(IOUtils.toByteArray(file.getInputStream()));
            Customer customer = customerService.getCustomerByEmail(email);

            amazonService.detectFaces(image.withBytes(byteBuffer), "/".concat(customer.getPhoto()));

            return ResponseEntity.ok().body(customer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageDTO("E-mail ou autenticação facial inválida"));
        }
    }
}
