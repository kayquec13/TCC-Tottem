package br.com.tcc.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.tcc.dtos.interfaces.GeneralCustomerDataDTO;
import br.com.tcc.models.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    final String GET_PHOTO_BY_CUSTOMER_ID = "SELECT " +
    "c.photo " +
    "FROM customers c " +
    "WHERE c.id = :customerId";

    final String GET_CUSTOMER_BY_ID = "SELECT " +
    "c.name AS name, " +
    "c.document AS document, " +
    "c.photo AS photo, " +
    "a.id AS addressId, " +
    "a.street AS street, " +
    "a.city AS city, " +
    "a.number AS number, " +
    "a.neighborhood AS neighborhood, " +
    "a.cep AS cep " +
    "FROM customers c " +
    "LEFT JOIN addresses a " +
    "ON a.customer_id = c.id " +
    "WHERE c.id = :customerId";

    Customer getByEmailOrDocument(String email, Long document);

    @Query(value = GET_CUSTOMER_BY_ID, nativeQuery = true)
    Optional<GeneralCustomerDataDTO> getCustomerById(Long customerId);
    Optional<Customer> getCustomerByEmail(String email);

    @Query(value = GET_PHOTO_BY_CUSTOMER_ID, nativeQuery = true)
    Optional<String> getPhotoById(Long customerId);
}
