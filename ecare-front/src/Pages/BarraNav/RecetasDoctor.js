import React, { useEffect, useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import axios from "axios"
import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Box from '@mui/material/Box';

function RecetaForm() {
  const [descripcion, setDescripcion] = useState('');
  const [curp, setCurp] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  const [selectedMedicamentos, setSelectedMedicamentos] = useState([]);
  const [diagnostico, setDiagnostico] = useState('');
  const [citas, setCitas] = useState([]);
  const [selectedCita, setSelectedCita] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const handleSelectedCita = (event) => {
    setSelectedCita(event.target.value)
}

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleCurpChange = (event) => {
    setCurp(event.target.value);
  };

  const handleMedicamentoChange = (event) => {
    const selectedMedicamentos = [...medicamentos];
    if (event.target.checked) {
      selectedMedicamentos.push(event.target.value);
      console.log(event.target.value)
    } else {
      const index = selectedMedicamentos.indexOf(event.target.value);
      if (index > -1) {
        selectedMedicamentos.splice(index, 1);
      }
    }
    setSelectedMedicamentos(selectedMedicamentos);
  };

  const handleDiagnosticoChange = (event) => {
    setDiagnostico(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDescripcion('');
    setCurp('');
    setMedicamentos([]);
    setDiagnostico('');
  };

  useEffect(() => {
    axios.post('http://localhost:3001/citas/obtenerCitasDoctor', {
        curp: localStorage.getItem('curp')
    })
        .then((response) => {
            setCitas(response.data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            return "No se ha podido obtener la lista de servicios"
        })
    
    axios.get('http://localhost:3001/medicamentos/obtenerMedicamentos')
        .then((response) => {
            console.log(response)
            setMedicamentos(response.data)
            setIsLoading(false)            
        })
        .catch((error) => {
            console.log(error)
            return "No se ha podido obtener la lista de servicios"
        })
}, [])

  return (
    <Container>
        <Box
                    sx={{
                        marginTop: 8,
                    }}
                >
    <form onSubmit={handleSubmit}>
                
        <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="select-label">Selecciona una cita</InputLabel>
                    <Select
                        labelId='select-label'
                        id="select"
                        value={selectedCita}
                        onChange={handleSelectedCita}
                        label="El id de cita"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {citas.map((cita, index) => {
                            return <MenuItem key={index} value={cita.id_cita}>{cita.id_cita}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>
      <TextField
        label="Descripción"
        value={descripcion}
        onChange={handleDescripcionChange}
        multiline
        rows={4}
        fullWidth
        required
      />

      <TextField
        label="CURP del Paciente"
        value={curp}
        onChange={handleCurpChange}
        fullWidth
        required
      />

      <div>
        <p>Medicamentos:</p>
        {medicamentos.map((medicamento) => {
            return <FormControlLabel
            control={
              <Checkbox
                key={medicamento.id_medicamento}
                checked={selectedMedicamentos.includes(medicamento.id_medicamento)}
                onChange={handleMedicamentoChange}
                value={medicamento.id_medicamento}
              />
            }
            label={medicamento.nombre_medicamento}
          />
        })}
      </div>

      <TextField
        label="Diagnóstico"
        value={diagnostico}
        onChange={handleDiagnosticoChange}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Generar Receta
      </Button>
    </form>
    </Box>
    </Container>
  );
}

export default RecetaForm;