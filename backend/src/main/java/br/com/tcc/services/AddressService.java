package br.com.tcc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.tcc.models.Address;
import br.com.tcc.repositories.AddressRepository;
import br.com.tcc.repositories.CustomerRepository;
import br.com.tcc.validators.AddressValidator;

@Service
public class AddressService {
    
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public Address create(AddressValidator data, Long customerId) {
       return addressRepository.save(convert(data, customerId));
    }

    public Address update(AddressValidator data, Long customerId) {
        Address address = addressRepository.getById(data.getAddressId());
        address.setCep(data.getCep())
        .setStreet(data.getStreet())
        .setNumber(data.getNumber())
        .setNeighborhood(data.getNeighborhood())
        .setCity(data.getCity());

        return addressRepository.save(address);
        
    }

    public void deleteIfExists(Long customerId) {
        addressRepository.deleteByCustomerId(customerId);
    }

    public Address convert(AddressValidator data, Long customerId) {
        return new Address()
            .setCep(data.getCep())
            .setStreet(data.getStreet())
            .setNumber(data.getNumber())
            .setNeighborhood(data.getNeighborhood())
            .setCity(data.getCity())
            .setCustomer(customerRepository.getById(customerId));
    }
}
