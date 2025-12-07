package org.example.web4.service;

import lombok.RequiredArgsConstructor;
import org.example.web4.dto.HitRequestDto;
import org.example.web4.dto.HitResponseDto;
import org.example.web4.entity.HitEntity;
import org.example.web4.entity.UserEntity;
import org.example.web4.mapper.HitMapper;
import org.example.web4.repository.HitRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HitService {

    private final HitRepository hitRepository;
    private final HitMapper hitMapper;

    public HitResponseDto addHit(HitRequestDto dto, UserEntity user) {
        long start = System.nanoTime();
        boolean hit = isHit(dto.getX(), dto.getY(), dto.getR());
        long duration = System.nanoTime() - start;

        HitEntity e = HitEntity.builder()
                .x(dto.getX())
                .y(dto.getY())
                .r(dto.getR())
                .hit(hit)
                .timestamp(LocalDateTime.now())
                .executionTimeNs(duration)
                .user(user)
                .build();

        hitRepository.save(e);
        return hitMapper.toDto(e);
    }

    public List<HitResponseDto> getHits(UserEntity user) {
        return hitRepository.findByUserOrderByTimestampDesc(user).stream()
                .map(hitMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void clearHits(UserEntity user) {
        hitRepository.deleteByUser(user);
    }

     private boolean isHit(double x, double y, double r) {

        // Rectangle (x <=0, y>=0) width r/2 for x: [-r,0] and y: [0,r]
        if (x <= 0 && y >= 0) {
            if (x >= -r && x <= 0 && y <= r) {
                return true;
            }
        }

        // I-четверть
        // Triangle (x>=0,y>=0) right triangle with vertices (0,0), (r,0), (0,r/2)
        if (x >= 0 && y >= 0) {
            // check if point is below the line y = - (r/2)/r * x + r/2  => slope = -1/2
            double yLine = -1.0 * x + r / 2.0;
            if (y <= yLine && x * 2.0 <= r && y * 2.0 <= r) {
                return true;
            }
        }

        // Quarter circle in 4th quadrant (x>=0,y<=0) circle radius r/2 centered at (0,0) but negative y
        if (x >= 0 && y <= 0) {
            double dist2 = x * x + y * y;
            if (dist2 <= (r/2.0) * (r/2.0)) {
                return true;
            }
        }

        return false;
    }
}
