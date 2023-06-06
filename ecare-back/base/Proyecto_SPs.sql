USE Hospital;

--STORED PROCEDURE PARA VALIDAR LA INSERCI�N DE UN USUARIO

CREATE PROCEDURE insertar_usuario
	@curp VARCHAR(18),
	@correo VARCHAR(40),
	@password VARCHAR(15),
	@nombre VARCHAR(20),
	@ap_paterno VARCHAR(20),
	@ap_materno VARCHAR(20),
	@celular VARCHAR(10),
	@edad INT,
	@id_sexo INT,
	@id_ocupacion INT,
	@id_tipo_usuario INT,
	@id_especialidad INT
AS
	IF @curp IS NULL OR @correo IS NULL OR @password IS NULL OR @nombre IS NULL OR @ap_paterno IS NULL OR @ap_materno IS NULL OR @celular IS NULL OR @edad IS NULL OR @id_sexo IS NULL OR @id_ocupacion IS NULL OR  @id_tipo_usuario IS NULL
	BEGIN
		PRINT 'Hay datos nulos'
	END
	ELSE
	BEGIN
		IF @curp='' OR @correo='' OR @password='' OR @nombre='' OR @ap_paterno='' OR @ap_materno='' OR @celular=''
		BEGIN
			PRINT 'Hay campos vac�os'
		END
		ELSE
		BEGIN
			IF DATALENGTH(@curp) != 18
			BEGIN
				PRINT 'Curp inv�lida, debe ser de 18 caracteres'
			END
			ELSE
			BEGIN
				IF @id_sexo > 2 OR @id_sexo < 0
				BEGIN
					PRINT 'Sexo no v�lido'
				END
				ELSE
				BEGIN
					IF @id_ocupacion > 12 OR @id_ocupacion < 1
					BEGIN
						PRINT 'Ocupaci�n no v�lida'
					END
					ELSE
					BEGIN
						IF @edad < 0 OR @edad > 122
						BEGIN
							PRINT 'Edad inv�lida'
						END
						ELSE
						BEGIN
							IF (@id_tipo_usuario = 2 AND @id_ocupacion != 1) OR (@id_tipo_usuario = 3 AND @id_ocupacion != 12)
							BEGIN
								PRINT 'La ocupaci�n no coincide con el tipo de usuario'
							END
							ELSE
							BEGIN
								IF @id_tipo_usuario = 2 AND (@id_especialidad < 1 OR @id_especialidad > 20)
								BEGIN
									PRINT 'Especialidad inv�lida'
								END
								ELSE
								BEGIN
									IF DATALENGTH(@celular) != 10
									BEGIN
										PRINT 'Celular no es de 10 d�gitos'
									END
									ELSE
									BEGIN
										PRINT 'Datos v�lidos'
									END
								END
							END
						END
					END
				END
			END
		END	
	END


-- STORED PROCEDURE PARA ACTUALIZAR EXISTENCIAS DE UN MEDICAMENTO

CREATE PROCEDURE actualizar_medicamento
	@nombre_medicamento VARCHAR(15),
	@cantidad INT,
	@operacion INT
AS
	DECLARE @cantidad_final INT

	IF @nombre_medicamento IS NULL OR @cantidad IS NULL OR @operacion IS NULL
	BEGIN
		PRINT 'No puede haber datos nulos'
	END
	ELSE
	BEGIN
		IF @nombre_medicamento = ''
		BEGIN
			PRINT 'El nombre no puede ser vac�o'
		END
		ELSE
		BEGIN
			IF EXISTS(SELECT * FROM Medicamento WHERE nombre_medicamento = @nombre_medicamento)
			BEGIN
				IF @operacion = 1
				BEGIN
					SET @cantidad_final = (SELECT existencia FROM Medicamento WHERE nombre_medicamento = @nombre_medicamento) + @cantidad
					UPDATE Medicamento SET existencia = @cantidad_final WHERE nombre_medicamento = @nombre_medicamento;
				END
				ELSE
				BEGIN
					IF @operacion = 2
					BEGIN
						SET @cantidad_final = (SELECT existencia FROM Medicamento WHERE nombre_medicamento = @nombre_medicamento) - @cantidad
						IF @cantidad_final < 0
						BEGIN
							PRINT 'No puedes restar m�s de lo que hay'
						END
						ELSE
						BEGIN
							UPDATE Medicamento SET existencia = @cantidad_final WHERE nombre_medicamento = @nombre_medicamento;
						END
					END
					ELSE
					BEGIN
						UPDATE Medicamento SET existencia = 0 WHERE nombre_medicamento = @nombre_medicamento;
					END
				END
			END
			ELSE
			BEGIN
				PRINT 'El medicamento no existe'
			END
		END
	END