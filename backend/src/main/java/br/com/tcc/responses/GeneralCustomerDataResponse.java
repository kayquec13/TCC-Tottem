package br.com.tcc.responses;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GeneralCustomerDataResponse {
    
    @JsonProperty(value = "address_id")
    private Long addressId;

    private String name;
    private Long document;
    private String photo;
    private String cep;
    private String street;
    private Integer number;
    private String neighborhood;
    private String city;

    public String getName() {
        return name;
    }

    public GeneralCustomerDataResponse setName(String name) {
        this.name = name;
        return this;
    } 

    public Long getDocument() {
        return document;
    }

    public GeneralCustomerDataResponse setDocument(Long document) {
        this.document = document;
        return this;
    }

    public String getPhoto() {
        return photo;
    }
    public GeneralCustomerDataResponse setPhoto(String photo) {
        this.photo = photo;
        return this;
    }

    public Long getAddressId() {
        return addressId;
    }

    public GeneralCustomerDataResponse setAddressId(Long addressId) {
        this.addressId = addressId;
        return this;
    } 

    public String getCep() {
        return cep;
    }

    public GeneralCustomerDataResponse setCep(String cep) {
        this.cep = cep;
        return this;
    } 

    public String getStreet() {
        return street;
    }

    public GeneralCustomerDataResponse setStreet(String street) {
        this.street = street;
        return this;
    } 

    public Integer getNumber() {
        return number;
    }

    public GeneralCustomerDataResponse setNumber(Integer number) {
        this.number = number;
        return this;
    } 

    public String getCity() {
        return city;
    }

    public GeneralCustomerDataResponse setCity(String city) {
        this.city = city;
        return this;
    } 

    public String getNeighborhood() {
        return neighborhood;
    }

    public GeneralCustomerDataResponse setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
        return this;
    } 
}
