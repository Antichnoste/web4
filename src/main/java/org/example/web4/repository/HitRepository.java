package org.example.web4.repository;

import org.example.web4.entity.HitEntity;
import org.example.web4.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HitRepository extends JpaRepository<HitEntity, Long> {

    List<HitEntity> findByUserOrderByTimestampDesc(UserEntity user);

    void deleteByUser(UserEntity user);
}
