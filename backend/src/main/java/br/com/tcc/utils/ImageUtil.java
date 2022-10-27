package br.com.tcc.utils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import com.amazonaws.services.rekognition.model.Image;
import com.amazonaws.util.IOUtils;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ImageUtil {

    final private String resourcesPath = "/src/main/resources/static/images/";
    final private String defaultPhotoExtension = ".ogg";

    public String savePhoto(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        Path absolutePath = Paths.get(".").toAbsolutePath();
        String fileName = UUID.randomUUID().toString().concat(defaultPhotoExtension);
        Path path = Paths.get(absolutePath + resourcesPath.concat(fileName));
        Files.write(path, bytes);

        return fileName;
    }

    public Image getImageWithBytes(String imageResource) throws IOException {
        InputStream inputStream = new ClassPathResource("/static/images/" + imageResource).getInputStream();
        ByteBuffer byteBuffer = ByteBuffer.wrap(IOUtils.toByteArray(inputStream));

        Image image = new Image();
        return image.withBytes(byteBuffer);
    }

}
