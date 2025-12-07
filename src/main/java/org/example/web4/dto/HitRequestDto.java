package org.example.web4.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HitRequestDto {

    @Min(-5)
    @Max(3)
    private Double x;

    @Min(-3)
    @Max(5)
    private Double y;

    @Min(1)
    @Max(5)
    private Double r;
}
