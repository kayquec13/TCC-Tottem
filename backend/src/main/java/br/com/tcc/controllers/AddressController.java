package br.com.tcc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tcc.dtos.MessageDTO;
import br.com.tcc.responses.AddressResponse;
import br.com.tcc.responses.ViaCepResponse;
import br.com.tcc.services.ViaCepService;

@RestController
@RequestMapping("/address")
public class AddressController {
    
    @Autowired
    private ViaCepService viaCepService;

    @GetMapping("{cep}")
    public ResponseEntity<?> findAddress(@PathVariable("cep") String cep) {
        try {
            ViaCepResponse viaCepResponse = viaCepService.findAddress(cep);
            return ResponseEntity.ok().body(new AddressResponse().convertFromViaCep(viaCepResponse));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageDTO("Erro ao pesquisar endereço"));
        }
    }
}
