
USE Hospital
GO
-- SELECT * FROM Medicamento_Receta;
-- GO
-- SELECT * FROM Receta_Usuario;
-- GO
-- SELECT *
-- FROM dbo.ObtenerMedicamentosRecetados('HEVL930523MDFNNL06','','','');
-- GO
-- SELECT *
-- FROM dbo.ObtenerMedicamentosRecetados('','Laura','Herrera','Vargas');
-- GO
-- SELECT *
-- FROM dbo.ObtenerMedicamentosRecetados(@curp ='HEVL930523MDFNNL06',@nombre = "Laura", @ap_paterno = "Herrera", @ap_materno = "Vargas");

-- SELECT * FROM dbo.ObtenerCitas('RASP870523MDFNNP02', '2023/05/30');
-- GO
-- SELECT * FROM dbo.ObtenerCitas(NULL, '2023/05/30');

-- --STORED PROCEDURE PARA VALIDAR LA INSERCIÓN DE UN USUARIO
-- DROP PROCEDURE insertar_usuario
-- GO

-- SELECT * FROM dbo.ObtenerCitasDoctor('Luis Gonzalez Espinoza','NMEG920720ARVSCQ53');
-- ALTER TABLE Usuario ADD estatus INT DEFAULT 1;
-- GO

-- SELECT c.name AS nombre_columna, t.name AS tipo_dato, c.max_length AS longitud_maxima
-- FROM sys.columns c
-- JOIN sys.types t ON c.system_type_id = t.system_type_id
-- WHERE c.object_id = OBJECT_ID('Cita');
-- UPDATE Usuario SET estatus = 1 WHERE curp ='GOLM910523MDFNNM10'
-- SELECT * FROM dbo.horas_ocupadas_de_consultorio(1, '2023/06/29');
SELECT * FROM dbo.horas_ocupadas_de_consultorio(1, '2023/06/29');
-- -- SELECT estatus FROM Usuario WHERE curp = 'GOLM910523MDFNNM10'

-- UPDATE Usuario SET estatus = 1 WHERE curp = 'GOLM910523MDFNNM10'

-- SELECT Ciu.curp
-- FROM Cita_Usuario Ciu
-- INNER JOIN (SELECT U.curp,C.id_cita, C.notas, C.fecha, TS.tipo_servicio, TS.costo
--     FROM Cita_Usuario CU
--     INNER JOIN Cita C ON CU.id_cita = C.id_cita
--     INNER JOIN Tipo_Servicio TS ON C.id_tipo_servicio = TS.id_tipo_servicio
--     INNER JOIN Consultorio CO ON TS.id_consultorio = CO.id_consultorio
--     INNER JOIN Usuario U ON CU.curp = U.curp
--     WHERE U.curp like 'TSNO910309RJYXZV84') AS t2 ON Ciu.id_cita = t2.id_cita
-- GROUP BY Ciu.curp
-- HAVING COUNT(Ciu.curp) 


    -- SELECT U.curp,C.id_cita, C.notas, C.fecha, TS.tipo_servicio, TS.costo
    -- FROM Cita_Usuario CU
    -- INNER JOIN Cita C ON CU.id_cita = C.id_cita
    -- INNER JOIN Tipo_Servicio TS ON C.id_tipo_servicio = TS.id_tipo_servicio
    -- INNER JOIN Consultorio CO ON TS.id_consultorio = CO.id_consultorio
    -- INNER JOIN Usuario U ON CU.curp = U.curp
    -- WHERE U.curp like 'TSNO910309RJYXZV84'

GO
