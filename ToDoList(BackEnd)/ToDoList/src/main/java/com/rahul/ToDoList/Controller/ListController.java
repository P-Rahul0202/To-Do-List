package com.rahul.ToDoList.Controller;


import com.rahul.ToDoList.Model.ListModel;
import com.rahul.ToDoList.Service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class ListController {

    @Autowired
    private ListService service;

    @GetMapping("home")
    public String greet(){
        return "Hello Good Morning...";
    }

    @GetMapping("getData")
    public List<ListModel> getList(){
       return service.getList();
    }

    @PostMapping("addData")
    public ListModel addData(@RequestBody ListModel data){
        return service.addData(data);
    }

    @PutMapping ("updateData")
    public ListModel updateData(@RequestBody ListModel data){
        return service.updateData(data);
    }

    @DeleteMapping("deleteData/{idNo}")
    public void deleteData(@PathVariable int idNo){
        service.deleteData(idNo);
    }
}
