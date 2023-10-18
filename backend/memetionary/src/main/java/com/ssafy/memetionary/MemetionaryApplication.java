package com.ssafy.memetionary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MemetionaryApplication {

    public static void main(String[] args) {
        SpringApplication.run(MemetionaryApplication.class, args);
    }

}
