package br.com.tcc.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.api.gax.rpc.NotFoundException;

import br.com.tcc.responses.ViaCepResponse;

@Service
public class ViaCepService {
    
    @Value("${via.cep.url}")
    private String viaCepUrl;

    public ViaCepResponse findAddress(String cep) throws Exception {

        RestTemplate restTemplate = new RestTemplate();
        ViaCepResponse viaCepResponse = restTemplate.getForObject(viaCepUrl.replace("{cep}", cep), ViaCepResponse.class);

        if (viaCepResponse.getError()) {
            throw new Exception("Endereço não encontrado");
        }

        return viaCepResponse;
    }
}
