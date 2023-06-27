--Relación Usuario con Receta_Usuario
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Receta_Usuario') 
AND referenced_object_id = OBJECT_ID('Usuario');

ALTER TABLE Receta_Usuario
DROP CONSTRAINT curp_receta;

ALTER TABLE Receta_Usuario
ADD CONSTRAINT curp_receta FOREIGN KEY (curp)
REFERENCES Usuario (curp)
ON DELETE CASCADE;

--Relación Receta con Receta_Usuario
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Receta_Usuario') 
AND referenced_object_id = OBJECT_ID('Receta');

ALTER TABLE Receta_Usuario
DROP CONSTRAINT id_receta_usuario;

ALTER TABLE Receta_Usuario
ADD CONSTRAINT id_receta_usuario FOREIGN KEY (id_receta)
REFERENCES Receta (id_receta)
ON DELETE CASCADE;

--Relación Receta con Medicamento_Receta
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Medicamento_Receta') 
AND referenced_object_id = OBJECT_ID('Receta');

ALTER TABLE Medicamento_Receta
DROP CONSTRAINT id_receta;

ALTER TABLE Medicamento_Receta
ADD CONSTRAINT id_receta FOREIGN KEY (id_receta)
REFERENCES Receta (id_receta)
ON DELETE CASCADE;

--Relación Medicamento con Medicamento_Receta
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Medicamento_Receta') 
AND referenced_object_id = OBJECT_ID('Medicamento');

ALTER TABLE Medicamento_Receta
DROP CONSTRAINT id_medicamento;

ALTER TABLE Medicamento_Receta
ADD CONSTRAINT id_medicamento FOREIGN KEY (id_medicamento)
REFERENCES Medicamento (id_medicamento)
ON DELETE CASCADE;

--Relación Presentacion con Medicamento
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Medicamento') 
AND referenced_object_id = OBJECT_ID('Presentacion');

ALTER TABLE Medicamento
DROP CONSTRAINT id_presentacion;

ALTER TABLE Medicamento
ADD CONSTRAINT id_presentacion FOREIGN KEY (id_presentacion)
REFERENCES Presentacion (id_presentacion)
ON DELETE CASCADE;

--Relación Usuario con Especialidad_Usuario
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Especialidad_Usuario') 
AND referenced_object_id = OBJECT_ID('Usuario');

ALTER TABLE Especialidad_Usuario
DROP CONSTRAINT curp;

ALTER TABLE Especialidad_Usuario
ADD CONSTRAINT curp FOREIGN KEY (curp)
REFERENCES Usuario (curp)
ON DELETE CASCADE;

--Relación Especialidad con Especialidad_Usuario
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Especialidad_Usuario') 
AND referenced_object_id = OBJECT_ID('Especialidad');

ALTER TABLE Especialidad_Usuario
DROP CONSTRAINT id_especialidad;

ALTER TABLE Especialidad_Usuario
ADD CONSTRAINT id_especialidad FOREIGN KEY (id_especialidad)
REFERENCES Especialidad (id_especialidad)
ON DELETE CASCADE;

--Relación Ocupacion con Usuario
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Usuario') 
AND referenced_object_id = OBJECT_ID('Ocupacion');

ALTER TABLE Usuario
DROP CONSTRAINT id_ocupacion;

ALTER TABLE Usuario
ADD CONSTRAINT id_ocupacion FOREIGN KEY (id_ocupacion)
REFERENCES Ocupacion (id_ocupacion)
ON DELETE CASCADE;

--Relación Usuario con Cita_Usuario
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Cita_Usuario') 
AND referenced_object_id = OBJECT_ID('Usuario');

ALTER TABLE Cita_Usuario
DROP CONSTRAINT curp_cita;

ALTER TABLE Cita_Usuario
ADD CONSTRAINT curp_cita FOREIGN KEY (curp)
REFERENCES Usuario (curp)
ON DELETE CASCADE;

--Relación Cita con Cita_Usuario
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Cita_Usuario') 
AND referenced_object_id = OBJECT_ID('Cita');

ALTER TABLE Cita_Usuario
DROP CONSTRAINT id_cita_usuario;

ALTER TABLE Cita_Usuario
ADD CONSTRAINT id_cita_usuario FOREIGN KEY (id_cita)
REFERENCES Cita (id_cita)
ON DELETE CASCADE;

--Relación Tipo_servicio con Cita
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Cita') 
AND referenced_object_id = OBJECT_ID('Tipo_servicio');

ALTER TABLE Cita
DROP CONSTRAINT tipo_servicio_cita;

ALTER TABLE Cita
ADD CONSTRAINT tipo_servicio_cita FOREIGN KEY (id_tipo_servicio)
REFERENCES Tipo_servicio (id_tipo_servicio)
ON DELETE CASCADE;

--Relación Consultorio con Tipo_servicio
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('Tipo_servicio') 
AND referenced_object_id = OBJECT_ID('Consultorio');

ALTER TABLE Tipo_servicio
DROP CONSTRAINT Servicio_Consultorio;

ALTER TABLE Tipo_servicio
ADD CONSTRAINT Servicio_Consultorio FOREIGN KEY (id_consultorio)
REFERENCES Consultorio (id_consultorio)
ON DELETE CASCADE;


/*
SELECT name
FROM sys.foreign_keys
WHERE parent_object_id = OBJECT_ID('TablaConLlaveForanea') 
AND referenced_object_id = OBJECT_ID('TablaConLlavePrincipal');

ALTER TABLE TablaConLlaveForanea
DROP CONSTRAINT NombreRestriccion;

ALTER TABLE TablaConLlaveForanea
ADD CONSTRAINT NombreRestriccion FOREIGN KEY (CampoLlaveForanea)
REFERENCES TablaConLlavePrincipal (LlavePrincipal)
ON DELETE CASCADE;

*/