package com.ezhuanbing.api.model;

import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Table(name = "tr_admin")
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
  private String login;

  private Integer hospitalId;

  private String online;

  private String neteasetoken;
}