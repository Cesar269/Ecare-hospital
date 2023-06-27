--Historial de citas 
CREATE FUNCTION ObtenerCitasDoctor
(
    @curpDoctor varchar(18)
)
RETURNS TABLE
AS
RETURN
(

    SELECT U.curp,C.id_cita, C.notas, C.fecha, TS.tipo_servicio, TS.costo
    FROM Cita_Usuario CU
    INNER JOIN Cita C ON CU.id_cita = C.id_cita
    INNER JOIN Tipo_Servicio TS ON C.id_tipo_servicio = TS.id_tipo_servicio
    INNER JOIN Consultorio CO ON TS.id_consultorio = CO.id_consultorio
    INNER JOIN Usuario U ON CU.curp = U.curp
    WHERE U.curp IN(SELECT Ciu.curp
FROM Cita_Usuario Ciu
INNER JOIN (SELECT U.curp,C.id_cita, C.notas, C.fecha, TS.tipo_servicio, TS.costo
    FROM Cita_Usuario CU
    INNER JOIN Cita C ON CU.id_cita = C.id_cita
    INNER JOIN Tipo_Servicio TS ON C.id_tipo_servicio = TS.id_tipo_servicio
    INNER JOIN Consultorio CO ON TS.id_consultorio = CO.id_consultorio
    INNER JOIN Usuario U ON CU.curp = U.curp
    WHERE U.curp = @curpDoctor) AS t2 ON Ciu.id_cita = t2.id_cita
GROUP BY Ciu.curp
HAVING COUNT(Ciu.curp) = 1)

);

--SELECT * FROM dbo.ObtenerCitasDoctor('Nombre Completo del Doctor', 'CURP del Doctor');

