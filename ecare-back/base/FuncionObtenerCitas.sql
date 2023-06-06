USE Hospital;

/*	
	Funci�n que recibe como par�metros el curp del doctor y una fecha
	para mostrar las citas de ese d�a para el doctor.

	Falta de nombre pero se brinda la fecha:
		Todas las citas de ese d�a (De todos los doctores).
	Se brinda el nombre pero no la fecha:
		Todas las citas registradas del doctor del dia actual en adelante.
	Falta de nombre y fecha:
		Todas las citas de todos los doctores que esten registradas del dia actual en adelante.
*/

CREATE FUNCTION ObtenerCitas (@curpDoctor VARCHAR(18), @fecha DATE)
RETURNS @tbCitas TABLE(
	doctor VARCHAR(150),
	fecha DATE,
	consultorio INT,
	servicio VARCHAR(40),
	costo MONEY
)
AS
BEGIN
	--Falta de curp y fecha
	IF @curpDoctor IS NULL AND @fecha IS NULL
		BEGIN
		INSERT INTO @tbCitas
			SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
					C.fecha,
					C.id_consultorio,
					TS.tipo_servicio,
					TS.costo
			FROM Usuario AS U
			INNER JOIN Cita_Usuario AS CU
			ON U.curp = CU.curp
			INNER JOIN Cita AS C
			ON CU.id_cita = C.id_cita
			INNER JOIN Tipo_servicio AS TS
			ON C.id_tipo_servicio = TS.id_tipo_servicio
			WHERE C.fecha >= GETDATE()
		END
	ELSE
		--Falta de curp
		IF @curpDoctor IS NULL
			BEGIN
			INSERT INTO @tbCitas
				SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
						C.fecha,
						C.id_consultorio,
						TS.tipo_servicio,
						TS.costo
				FROM Usuario AS U
				INNER JOIN Cita_Usuario AS CU
				ON U.curp = CU.curp
				INNER JOIN Cita AS C
				ON CU.id_cita = C.id_cita
				INNER JOIN Tipo_servicio AS TS
				ON C.id_tipo_servicio = TS.id_tipo_servicio
				WHERE C.fecha = @fecha
			END
		ELSE
			--Falta de fecha
			IF @fecha IS NULL
				BEGIN
				INSERT INTO @tbCitas
					SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
							C.fecha,
							C.id_consultorio,
							TS.tipo_servicio,
							TS.costo
					FROM Usuario AS U
					INNER JOIN Cita_Usuario AS CU
					ON U.curp = CU.curp
					INNER JOIN Cita AS C
					ON CU.id_cita = C.id_cita
					INNER JOIN Tipo_servicio AS TS
					ON C.id_tipo_servicio = TS.id_tipo_servicio
					WHERE U.curp = @curpDoctor
					AND C.fecha >= GETDATE()
				END
	ELSE
		--Se brinda el curp y fecha
		BEGIN
		INSERT INTO @tbCitas
			SELECT	CONCAT(U.nombre, ' ', U.ap_paterno, ' ', U.ap_materno),
					C.fecha,
					C.id_consultorio,
					TS.tipo_servicio,
					TS.costo
			FROM Usuario AS U
			INNER JOIN Cita_Usuario AS CU
			ON U.curp = CU.curp
			INNER JOIN Cita AS C
			ON CU.id_cita = C.id_cita
			INNER JOIN Tipo_servicio AS TS
			ON C.id_tipo_servicio = TS.id_tipo_servicio
			WHERE U.curp = @curpDoctor
			AND C.fecha = @fecha
		END
	RETURN
END
GO

SELECT * FROM dbo.ObtenerCitas('RASP870523MDFNNP02', '2023/05/30');
SELECT * FROM dbo.ObtenerCitas('HEVL930523MDFNNL06', NULL);
SELECT * FROM dbo.ObtenerCitas(NULL, '2023/05/30');
SELECT * FROM dbo.ObtenerCitas(NULL, NULL);