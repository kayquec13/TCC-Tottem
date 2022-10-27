package br.com.tcc.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.tcc.dtos.MessageDTO;
import br.com.tcc.exceptions.RegisterDoesExistsException;
import br.com.tcc.models.Customer;
import br.com.tcc.services.AddressService;
import br.com.tcc.services.CustomerService;
import br.com.tcc.utils.ImageUtil;
import br.com.tcc.validators.CustomerUpdateValidator;
import br.com.tcc.validators.CustomerValidator;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    
    @Autowired
    private AddressService addressService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ImageUtil imageUtil;

    @GetMapping("/{customerId}")
    public ResponseEntity<?> getCustomerById(@PathVariable("customerId") Long customerId) {
        try {
            return ResponseEntity.ok().body(customerService.getCustomerById(customerId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageDTO("Erro ao carregar dados do cliente."));
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestPart("data") @Valid CustomerValidator data, @RequestPart("photo") MultipartFile file) {
        try {
            customerService.customerExists(data.getEmail(), data.getDocument());
            String photoFileName = imageUtil.savePhoto(file);
            Customer customer = customerService.create(data, photoFileName);

            return ResponseEntity.status(HttpStatus.OK).body(customer);
        } catch (RegisterDoesExistsException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageDTO(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageDTO( "Erro ao salvar cliente"));
        }
    }

    @PostMapping("/atualiza/{customerId}")
    public ResponseEntity<?> update(@PathVariable("customerId") Long customerId, @RequestBody @Valid CustomerUpdateValidator data) {
        try {
            customerService.update(data.getCustomer(), customerId);
            if (data.getAddress().getAddressId() != null) {
                addressService.update(data.getAddress(), customerId);
            } else {
                addressService.deleteIfExists(customerId);
                addressService.create(data.getAddress(), customerId);
            }

            return ResponseEntity.status(HttpStatus.OK).body(new MessageDTO("Cadastro atualizado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageDTO( "Erro ao salvar cliente"));
        }

    }
}