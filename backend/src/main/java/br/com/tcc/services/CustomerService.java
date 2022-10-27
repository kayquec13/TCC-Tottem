package br.com.tcc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.tcc.validators.CustomerValidator;
import br.com.tcc.repositories.CustomerRepository;
import br.com.tcc.responses.GeneralCustomerDataResponse;
import br.com.tcc.dtos.interfaces.GeneralCustomerDataDTO;
import br.com.tcc.exceptions.RegisterDoesExistsException;
import br.com.tcc.models.Customer;

@Service
public class CustomerService {
    
    @Autowired
    private CustomerRepository customerRepository;

    public Customer create(CustomerValidator data, String photoFileName) {
        return customerRepository.save(convert(data, photoFileName));
    }

    public Customer update(CustomerValidator data, Long customerId) throws RegisterDoesExistsException {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RegisterDoesExistsException("Cliente não encontrado"));
        
        customer.setName(data.getName())
            .setDocument(data.getDocument());
        
        return customerRepository.save(customer);
    }

    public Customer getCustomerByEmail(String email) throws RegisterDoesExistsException {
        return customerRepository.getCustomerByEmail(email)
            .orElseThrow(() -> new RegisterDoesExistsException("Cliente não encontrado"));
    }

    public GeneralCustomerDataResponse getCustomerById(Long customerId) throws RegisterDoesExistsException {
        GeneralCustomerDataDTO generalCustomerDataDTO = customerRepository.getCustomerById(customerId)
            .orElseThrow(() -> new RegisterDoesExistsException("Cliente não encontrado"));

        return new GeneralCustomerDataResponse()
            .setName(generalCustomerDataDTO.getName())
            .setDocument(generalCustomerDataDTO.getDocument())
            .setPhoto(generalCustomerDataDTO.getPhoto())
            .setAddressId(generalCustomerDataDTO.getAddressId())
            .setCep(generalCustomerDataDTO.getCep())
            .setStreet(generalCustomerDataDTO.getStreet())
            .setNumber(generalCustomerDataDTO.getNumber())
            .setNeighborhood(generalCustomerDataDTO.getNeighborhood())
            .setCity(generalCustomerDataDTO.getCity());
    }

    public void customerExists(String email, Long document) throws RegisterDoesExistsException {
        Customer customer = customerRepository.getByEmailOrDocument(email, document);

        if (customer != null) {
            throw new RegisterDoesExistsException("Cliente já cadastrado com esse e-mail ou documento.");
        }
    }

    public String getPhotoById(Long customerId) throws RegisterDoesExistsException {
        return customerRepository.getPhotoById(customerId)
            .orElseThrow(() -> new RegisterDoesExistsException("Erro ao localizar foto do usuário"));
    }

    public Customer convert(CustomerValidator data, String photoFileName) {
        Customer customer = new Customer();
        customer.setName(data.getName())
            .setEmail(data.getEmail())
            .setDocument(data.getDocument())
            .setPhoto(photoFileName);

        return customer;
    }
}
