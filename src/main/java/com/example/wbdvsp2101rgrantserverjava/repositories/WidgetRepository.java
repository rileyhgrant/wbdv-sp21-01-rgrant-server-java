package com.example.wbdvsp2101rgrantserverjava.repositories;

import com.example.wbdvsp2101rgrantserverjava.models.Widget;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WidgetRepository
        extends CrudRepository<Widget, Long> {

  // select * from wbdv_sp21_01_schema.widgets where topic_id=

//  @Query( value="select * from wbdv_sp21_01_schema.widgets where topic_id=:tid", nativeQuery = true)

  @Query( value="select * from p7cznbyiqlizgmsh.widgets where topic_id=:tid", nativeQuery = true)
  public List<Widget> findWidgetsForTopic( @Param("tid") String topicId );

}
