package br.com.tcc.services;

import java.io.IOException;
import java.util.List;

import br.com.tcc.utils.ImageUtil;
import com.google.protobuf.ByteString;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechSettings;
import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.google.cloud.speech.v1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GoogleSpeechToTextService {

    @Autowired
    ImageUtil imageUtil;

    private final String credentialsJsonFileName = "/google-cloud-credentials.json";

    public String transcript(MultipartFile file, String fieldType) throws IOException {
        String transcripted = "";
        byte[] bytes = file.getBytes();
        ByteString audioBytes = ByteString.copyFrom(bytes);

        SpeechClient speechClient = SpeechClient.create(getGoogleCredentials());

        RecognitionConfig config = RecognitionConfig.newBuilder()
                .setEncoding(AudioEncoding.WEBM_OPUS)
                .setSampleRateHertz(48000)
                .setAudioChannelCount(1)
                .setLanguageCode("pt-BR")
                .build();

        RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(audioBytes).build();
        RecognizeResponse response = speechClient.recognize(config, audio);

        List<SpeechRecognitionResult> results = response.getResultsList();

        for (SpeechRecognitionResult result : results) {
            SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
            transcripted = alternative.getTranscript();
        }

        transcripted = formatText(transcripted, fieldType);
        return transcripted;
    }

    public SpeechSettings getGoogleCredentials() throws IOException {
        return SpeechSettings.newBuilder()
                .setCredentialsProvider(
                        FixedCredentialsProvider.create(
                                ServiceAccountCredentials.fromStream(
                                        new ClassPathResource(credentialsJsonFileName).getInputStream())))
                .build();
    }

    private String formatText(String transcripted, String fieldType) {
        switch (fieldType) {
            case "email":
                transcripted = transcripted.replaceAll(" ", "")
                        .replaceAll("arroba", "@");
                break;
            case "integer":
                transcripted = transcripted.replaceAll("[^0-9]", "");
                break;
            default:
                System.out.println("Do nothing");
                break;
        }
        return transcripted;
    }
}
