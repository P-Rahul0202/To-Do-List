package com.rahul.ToDoList.Service;


import com.rahul.ToDoList.Model.ListModel;
import com.rahul.ToDoList.Repo.ListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListService {

    @Autowired
    private ListRepo repo;

    public List<ListModel> getList() {
        return repo.findAll();
    }

    public ListModel addData(ListModel data) {
       return repo.save(data);
    }

    public ListModel updateData(ListModel data) {
        return repo.save(data);
    }

    public void deleteData(int idNo) {
        repo.deleteById(idNo);
    }
}
