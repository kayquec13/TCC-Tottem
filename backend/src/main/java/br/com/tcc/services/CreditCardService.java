package br.com.tcc.services;

import br.com.tcc.models.CreditCard;
import br.com.tcc.repositories.CreditCardRepository;
import br.com.tcc.repositories.CustomerRepository;
import br.com.tcc.responses.CreditCardResponse;
import br.com.tcc.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CreditCardService {

    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public CreditCardResponse get(Long customerId) throws Exception {
        CreditCard creditCard = creditCardRepository.findByCustomerId(customerId)
                .orElseThrow(Exception::new);

        return convertResponse(creditCard);
    }
    public CreditCardResponse create(Integer planCode, Long customerId) {
        return convertResponse(creditCardRepository.save(convert(planCode, customerId)));
    }

    private CreditCard convert(Integer planCode, Long customerId) {
        CreditCard creditCard = new CreditCard();
        creditCard.setPlanCode(planCode);
        creditCard.setCustomer(customerRepository.findById(customerId).get());
        creditCard.setDueDate(DateUtils.plusTenYears(new Date()));
        creditCard.setLastDigits((int) ((Math.random() * 9000) + 1000));

        return creditCard;
    }

    private CreditCardResponse convertResponse(CreditCard creditCard) {
        CreditCardResponse response = new CreditCardResponse();
        response.setCustomerName(creditCard.getCustomer().getName());
        response.setLastDigits(creditCard.getLastDigits());
        response.setDueDate(creditCard.getDueDate());
        response.setPlanCode(creditCard.getPlanCode());

        return response;
    }
}
