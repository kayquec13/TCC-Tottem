package br.com.tcc.validators;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AddressValidator {
    
    @JsonProperty(value="address_id")
    private Long addressId;

    @NotNull
    private String cep;

    @NotNull
    @Length(min = 1, max = 255)
    private String street;

    @NotNull
    private Integer number;

    @NotNull
    @Length(min = 1, max = 255)
    private String neighborhood;

    @NotNull
    @Length(min = 1, max = 255)
    private String city;
    
    public Long getAddressId() {
        return addressId;
    }

    public String getCep() {
        return cep;
    }

    public String getStreet() {
        return street;
    }

    public Integer getNumber() {
        return number;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public String getCity() {
        return city;
    }
}
