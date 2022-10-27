package br.com.tcc.validators;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CustomerUpdateValidator {
    
    @JsonProperty(value="customer")
    private CustomerValidator customer;

    @JsonProperty(value="address")
    private AddressValidator address;

    public CustomerValidator getCustomer() {
        return customer;
    }

    public AddressValidator getAddress() {
        return address;
    }
}
