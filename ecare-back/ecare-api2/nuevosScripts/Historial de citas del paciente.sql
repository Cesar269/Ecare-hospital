CREATE FUNCTION ObtenerCitasPorCURP (@curp_paciente VARCHAR(18))
RETURNS TABLE
AS
RETURN
    SELECT C.id_cita, C.notas, C.fecha, TS.tipo_servicio, TS.costo, TS.id_consultorio
    FROM Cita_Usuario CU
    INNER JOIN Cita C ON CU.id_cita = C.id_cita
    INNER JOIN Tipo_Servicio TS ON C.id_tipo_servicio = TS.id_tipo_servicio
    WHERE CU.curp = @curp_paciente;
