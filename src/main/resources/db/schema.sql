/*==============================================================*/
/* Table: Patient                                               */
/*==============================================================*/

drop table if exists mb_patient_wx;
create table mb_patient_wx
(
   id                   int not null auto_increment,
   loginName            varchar(50) ,
   systemId				int(11),
   wxOpendId            varchar(150) ,
   primary key (id)
)