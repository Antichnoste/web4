package org.example.web4.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class AuthRequest {

    @NotBlank (message = "Логин должен что-то содержать")
    private String username;

    @NotBlank
    @Size(min = 6, message = "Пароль должен быть не меньше 6 символов")
    private String password;
}
