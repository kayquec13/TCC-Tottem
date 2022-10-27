package br.com.tcc.controllers;

import br.com.tcc.models.CreditCard;
import br.com.tcc.services.CreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("credit-card")
public class CreditCardController {

    @Autowired
    private CreditCardService creditCardService;

    @GetMapping("{customerId}")
    public ResponseEntity<?> get(@PathVariable("customerId") Long customerId) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(creditCardService.get(customerId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar cartão de crédito");
        }
    }

    @PostMapping("{planCode}/{customerId}")
    public ResponseEntity<?> create(@PathVariable("planCode") Integer planCode, @PathVariable("customerId") Long customerId) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(creditCardService.create(planCode, customerId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar cartão");
        }
    }
}
