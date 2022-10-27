package br.com.tcc.controllers;

import java.io.IOException;
import java.nio.ByteBuffer;

import com.amazonaws.services.rekognition.model.Image;
import com.amazonaws.util.IOUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.tcc.dtos.MessageDTO;
import br.com.tcc.exceptions.FaceNotRecognizedException;
import br.com.tcc.services.AmazonRekognitionService;
import br.com.tcc.services.CustomerService;

@RestController
@RequestMapping("/detect-face")
public class AmazonRekognitionController {
    
    @Autowired
    private AmazonRekognitionService service;

    @Autowired
    private CustomerService customerService;

    @PostMapping("/{customerId}")
    public ResponseEntity<?> detectFaces(@PathVariable("customerId") Long customerId, @RequestParam("photo") MultipartFile file) {
        try {
            Image image = new Image();
            ByteBuffer byteBuffer = ByteBuffer.wrap(IOUtils.toByteArray(file.getInputStream()));
            String photoStr = customerService.getPhotoById(customerId);

            service.detectFaces(image.withBytes(byteBuffer), "/".concat(photoStr));

            return ResponseEntity.ok().body(new MessageDTO("Face reconhecida com sucesso."));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageDTO("Erro ao carregar imagens."));
        } catch (FaceNotRecognizedException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageDTO(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageDTO("Erro ao reconhecer face."));
        }
    }
}
