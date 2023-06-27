CREATE PROCEDURE ObtenerHistorialCitasDoctor
    @nombreCompletoDoctor VARCHAR(100) = NULL,
    @curpDoctor VARCHAR(18) = NULL
AS
BEGIN
    SELECT c.id_cita, c.notas, c.fecha, ts.tipo_servicio, ts.costo
    FROM Cita c
    INNER JOIN Tipo_Servicio ts ON c.id_tipo_servicio = ts.id_tipo_servicio
    INNER JOIN Consultorio co ON ts.id_consultorio = co.id_consultorio
    WHERE (@nombreCompletoDoctor IS NULL OR @nombreCompletoDoctor = CONCAT(co.curp_doctor, ' ', @nombreCompletoDoctor))
        AND (@curpDoctor IS NULL OR co.curp_doctor = @curpDoctor);
END;

--EXEC ObtenerHistorialCitas @nombreCompletoDoctor = 'Nombre del Doctor';
--EXEC ObtenerHistorialCitas @curpDoctor = 'CURP del Doctor';
