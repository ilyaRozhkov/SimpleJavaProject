package se.highex.simple.service;

import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;
import se.highex.simple.entity.Recall;
import se.highex.simple.repositories.RecallRepository;

import java.util.List;

@Service
public class RecallService
{
    private final RecallRepository recallRepository;

    public RecallService(RecallRepository recallRepository)
    {
        this.recallRepository = recallRepository;
    }

    public List<Recall> getAll()
    {
        return recallRepository.findAll();
    }

    public Recall getById(Long id) throws ObjectNotFoundException
    {
        return recallRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(id, "Recall"));
    }

    public Recall create(Recall fdTemplate)
    {
        return recallRepository.save(fdTemplate);
    }

    public Recall update(Recall fdTemplate) throws ObjectNotFoundException
    {
        if(!recallRepository.existsById(fdTemplate.getId()))
            throw new ObjectNotFoundException(fdTemplate.getId(), "Recall");

        return recallRepository.save(fdTemplate);
    }

    public void deleteById(Long id) throws ObjectNotFoundException
    {
        if(!recallRepository.existsById(id))
            throw new ObjectNotFoundException(id, "Recall");

        recallRepository.deleteById(id);
    }
}
