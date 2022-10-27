package br.com.tcc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.tcc.dtos.MessageDTO;
import br.com.tcc.services.GoogleSpeechToTextService;

@RestController
@RequestMapping("/voice")
public class VoiceController {

    @Autowired
    private GoogleSpeechToTextService service;

    @PostMapping
    public ResponseEntity<?> transcript(@RequestPart("voice") MultipartFile file, @RequestPart("field-type") String fieldType) {
        try {
            String transcriptedMessage = service.transcript(file, fieldType);
            return ResponseEntity.ok().body(new MessageDTO(transcriptedMessage));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageDTO("Erro ao transcrever audio."));
        }
    }
}
