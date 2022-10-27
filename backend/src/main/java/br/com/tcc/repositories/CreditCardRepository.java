package br.com.tcc.repositories;

import br.com.tcc.models.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
    Optional<CreditCard> findByCustomerId(Long customerId);
}
