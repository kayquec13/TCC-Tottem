package br.com.tcc.services;

import java.io.IOException;
import java.util.List;

import com.amazonaws.services.rekognition.model.CompareFacesMatch;
import com.amazonaws.services.rekognition.model.CompareFacesRequest;
import com.amazonaws.services.rekognition.model.CompareFacesResult;
import com.amazonaws.services.rekognition.model.ComparedFace;
import com.amazonaws.services.rekognition.model.Image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.tcc.utils.ImageUtil;
import br.com.tcc.config.AmazonRekognitionConfiguration;
import br.com.tcc.exceptions.FaceNotRecognizedException;

@Service
public class AmazonRekognitionService {
    
    private AmazonRekognitionConfiguration client;
    private ImageUtil imageUtil;

    private final Float similarityThreshold = 70F;

    @Autowired
    public AmazonRekognitionService(AmazonRekognitionConfiguration client, ImageUtil imageUtil) {
        this.client = client;
        this.imageUtil = imageUtil;
    }

    public Boolean detectFaces(Image source, String targetStr) throws IOException, FaceNotRecognizedException {
        Image target = imageUtil.getImageWithBytes(targetStr);

        CompareFacesRequest request = buildRequest(source, target);
        CompareFacesResult response = client.amazonRekognition().compareFaces(request);

        List<CompareFacesMatch> faceMatchList = response.getFaceMatches();

        for (CompareFacesMatch match : faceMatchList) {
            ComparedFace face = match.getFace();
            if (face.getConfidence() >= 90) {
                return true;
            }
        }

        throw new FaceNotRecognizedException("Face não reconhecida");
    }

    private CompareFacesRequest buildRequest(Image source, Image target) {
        CompareFacesRequest request = new CompareFacesRequest();

        return request.withSourceImage(source)
                    .withTargetImage(target)
                    .withSimilarityThreshold(similarityThreshold);
    }
}