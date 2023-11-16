package com.ssafy.memetionary.declaration.service;

import com.ssafy.memetionary.common.CustomErrorType;
import com.ssafy.memetionary.common.exception.AlreadyReportException;
import com.ssafy.memetionary.declaration.entity.Declaration;
import com.ssafy.memetionary.declaration.entity.DeclarationLog;
import com.ssafy.memetionary.declaration.repository.DeclarationLogRepository;
import com.ssafy.memetionary.declaration.repository.DeclarationRepository;
import com.ssafy.memetionary.wordes.service.WordESService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DeclarationService {

    private final DeclarationRepository declarationRepository;
    private final DeclarationLogRepository declarationLogRepository;
    private final WordESService wordESService;

    private final int MAX_DECLARATION = 5;

    //단어 신고 - 신고 1
    @Transactional
    public void reportWord(String memberId, String wordId) {
        Declaration declaration = declarationRepository.findByWordId(wordId).orElse(null);
        DeclarationLog declarationLog = null;

        if (declaration == null) {
            declaration = Declaration.builder()
                .wordId(wordId)
                .build();
            declarationRepository.save(declaration);
        }

        declarationLogRepository.findByMemberIdAndDeclaration(memberId, declaration)
            .ifPresent(log -> {
                throw new AlreadyReportException(CustomErrorType.ALREADY_REPORT.getMessage());
            });

        declarationLog = DeclarationLog.builder()
            .memberId(memberId)
            .declaration(declaration)
            .build();
        declaration.setCount(declaration.getCount() + 1);
        declarationLogRepository.save(declarationLog);

        if(declaration.getCount() >= MAX_DECLARATION){
            wordESService.delete(wordId);
        }
    }
}
