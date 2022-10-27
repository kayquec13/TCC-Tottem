package br.com.tcc.responses;

public class AddressResponse {

    private String street;
    private String neighborhood;
    private String city;

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getNeighborhood() {
        return neighborhood;
    }
    
    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public AddressResponse convertFromViaCep(ViaCepResponse viaCepResponse) {
        setStreet(viaCepResponse.getStreet());
        setCity(viaCepResponse.getCity());
        setNeighborhood(viaCepResponse.getNeighborhood());

        return this;
    }
}
