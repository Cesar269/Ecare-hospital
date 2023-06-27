
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

SELECT * FROM Cita_Usuario Where id_cita = 1
GO



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
-- HAVING COUNT(Ciu.curp) = 1;
CREATE PROCEDURE MostrarCitasDoctorHoy
    @curpDoctor VARCHAR(18)
AS
BEGIN
    SELECT Cita.id_cita, Cita.notas, Cita.fecha, Tipo_Servicio.tipo_servicio
    FROM Cita
    INNER JOIN Tipo_Servicio ON Cita.id_tipo_servicio = Tipo_Servicio.id_tipo_servicio
    INNER JOIN Consultorio ON Tipo_Servicio.id_consultorio = Consultorio.id_consultorio
    INNER JOIN Usuario ON Consultorio.curp_doctor = Usuario.curp
    WHERE Usuario.curp = @curpDoctor
        AND Cita.fecha = CAST(GETDATE() AS DATE);
END;



    -- SELECT U.curp,C.id_cita, C.notas, C.fecha, TS.tipo_servicio, TS.costo
    -- FROM Cita_Usuario CU
    -- INNER JOIN Cita C ON CU.id_cita = C.id_cita
    -- INNER JOIN Tipo_Servicio TS ON C.id_tipo_servicio = TS.id_tipo_servicio
    -- INNER JOIN Consultorio CO ON TS.id_consultorio = CO.id_consultorio
    -- INNER JOIN Usuario U ON CU.curp = U.curp
    -- WHERE U.curp like 'TSNO910309RJYXZV84'

GO
