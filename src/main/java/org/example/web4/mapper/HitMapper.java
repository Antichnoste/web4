package org.example.web4.mapper;

import org.example.web4.dto.HitResponseDto;
import org.example.web4.entity.HitEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HitMapper {

    HitResponseDto toDto(HitEntity e);
}
