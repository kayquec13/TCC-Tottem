package br.com.tcc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.tcc.models.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
    
    void deleteByCustomerId(Long customerId);
}
