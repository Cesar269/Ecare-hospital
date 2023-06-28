CREATE FUNCTION ObtenerCitas (@curpDoctor VARCHAR(18), @fecha VARCHAR(10))
RETURNS @tbCitas TABLE(
	doctor VARCHAR(150),
	fecha VARCHAR(10),
	consultorio INT,
	servicio VARCHAR(40),
	costo INT,
	id_cita INT,
	estatus INT
)
AS
BEGIN
	IF @curpDoctor LIKE '' AND @fecha LIKE ''
		BEGIN
		INSERT INTO @tbCitas
			SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
					C.fecha,
					TS.id_consultorio,
					TS.tipo_servicio,
					TS.costo,
					C.id_cita,
					C.estatus
			FROM Usuario AS U
			INNER JOIN Cita_Usuario AS CU
			ON U.curp = CU.curp
			INNER JOIN Cita AS C
			ON CU.id_cita = C.id_cita
			INNER JOIN Cita_Tipo_servicio as CTS
			ON C.id_cita = CTS.id_cita
			INNER JOIN Tipo_servicio AS TS
			ON CTS.id_tipo_servicio = TS.id_tipo_servicio
		END
	ELSE
		IF @curpDoctor LIKE ''
			BEGIN
			INSERT INTO @tbCitas
				SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
						C.fecha,
						TS.id_consultorio,
						TS.tipo_servicio,
						TS.costo,
					C.id_cita,
					C.estatus
				FROM Usuario AS U
				INNER JOIN Cita_Usuario AS CU
				ON U.curp = CU.curp
				INNER JOIN Cita AS C
				ON CU.id_cita = C.id_cita
				INNER JOIN Cita_Tipo_servicio as CTS
				ON C.id_cita = CTS.id_cita
				INNER JOIN Tipo_servicio AS TS
				ON CTS.id_tipo_servicio = TS.id_tipo_servicio
				WHERE C.fecha = @fecha
			END
		ELSE
			IF @fecha LIKE ''
				BEGIN
				INSERT INTO @tbCitas
					SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
							C.fecha,
							TS.id_consultorio,
							TS.tipo_servicio,
							TS.costo,
					C.id_cita,
					C.estatus
					FROM Usuario AS U
					INNER JOIN Cita_Usuario AS CU
					ON U.curp = CU.curp
					INNER JOIN Cita AS C
					ON CU.id_cita = C.id_cita
					INNER JOIN Cita_Tipo_servicio as CTS
					ON C.id_cita = CTS.id_cita
					INNER JOIN Tipo_servicio AS TS
					ON CTS.id_tipo_servicio = TS.id_tipo_servicio
					WHERE U.curp = @curpDoctor
				END
	ELSE
		BEGIN
		INSERT INTO @tbCitas
			SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
					C.fecha,
					TS.id_consultorio,
					TS.tipo_servicio,
					TS.costo,
					C.id_cita,
					C.estatus
			FROM Usuario AS U
			INNER JOIN Cita_Usuario AS CU
			ON U.curp = CU.curp
			INNER JOIN Cita AS C
			ON CU.id_cita = C.id_cita
			INNER JOIN Cita_Tipo_servicio as CTS
			ON C.id_cita = CTS.id_cita
			INNER JOIN Tipo_servicio AS TS
			ON CTS.id_tipo_servicio = TS.id_tipo_servicio
			WHERE U.curp = @curpDoctor
			AND C.fecha = @fecha
		END
	RETURN
END
GO