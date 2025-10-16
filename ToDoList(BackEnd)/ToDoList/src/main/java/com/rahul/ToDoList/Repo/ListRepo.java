package com.rahul.ToDoList.Repo;

import com.rahul.ToDoList.Model.ListModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListRepo extends JpaRepository<ListModel,Integer> {

}
