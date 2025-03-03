
                document.getElementById('cekKuotaForm').addEventListener('submit', async e => {
                    e.preventDefault();
                    
                    // Get elements
                    const phoneNumber = document.getElementById('phoneNumber').value;
                    const submitBtn = document.getElementById('submitBtn');
                    const resultDiv = document.getElementById('result');
                    const loadingOverlay = document.getElementById('loadingOverlay');
                    
                    // Disable interactions
                    submitBtn.disabled = true;
                    document.getElementById('phoneNumber').disabled = true;
                    loadingOverlay.style.display = 'flex';
                    resultDiv.style.display = 'none';
                    resultDiv.innerHTML = '';
                    
                    const apiUrl = `https://apigw.kmsp-store.com/sidompul/v3/cek_kuota?msisdn=${phoneNumber}&isJSON=true`;
                    try {
                        const response = await fetch(apiUrl, {
                            headers: {
                                'Authorization': 'Basic c2lkb21wdWxhcGk6YXBpZ3drbXNw',
                                'X-API-Key': '4352ff7d-f4e6-48c6-89dd-21c811621b1c',
                                'X-App-Version': '3.0.0'
                            }
                        });
                        const data = await response.json();
                        
                        // Show results only after successful fetch
                        if (data.status) {
                            resultDiv.innerHTML = formatResult(data.data.hasil);
                            resultDiv.style.display = 'block';
                        } else {
                            resultDiv.innerHTML = `<div style="color:#e74c3c;font-weight:500">Error: ${data.data.keteranganError || 'Terjadi kesalahan. Silakan coba lagi.'}</div>`;
                            resultDiv.style.display = 'block';
                        }
                    } catch (error) {
                        resultDiv.innerHTML = `<div style="color:#e74c3c;font-weight:500">Gagal menghubungi server: ${error.message}</div>`;
                        resultDiv.style.display = 'block';
                    } finally {
                        // Re-enable interactions
                        loadingOverlay.style.display = 'none';
                        submitBtn.disabled = false;
                        document.getElementById('phoneNumber').disabled = false;
                    }
                });

                function formatResult(result) {
                    return result
                        .replace(/\d{2}:\d{2}:\d{2}/g,'\n')
                        .replace(/\d{4}-\d{2}-\d{2}/g,match=>new Date(match).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}))
                        .replace(/<br>/g,'\n')
                        .replace(/MSISDN:/g,'<span style="color:#4D96FF;font-weight:600">Nomor</span> :')
                        .replace(/\nTipe Kartu:/g,'<span style="color:#4D96FF;font-weight:600">Tipe Kartu</span> :')
                        .replace(/Status 4G:/g,'<span style="color:#4D96FF;font-weight:600">Status 4G</span> :')
                        .replace(/Umur Kartu:/g,'<span style="color:#4D96FF;font-weight:600">Umur Kartu</span> :')
                        .replace(/Status Dukcapil:/g,'<span style="color:#4D96FF;font-weight:600">Dukcapil</span> :')
                        .replace(/Masa Aktif:/g,'<span style="color:#4D96FF;font-weight:600">Masa Aktif</span> :')
                        .replace(/Masa Berakhir Tenggang:/g,'<span style="color:#4D96FF;font-weight:600">Masa Tenggang</span> :')
                        .replace(/Quota Details:/g,'<span style="color:#4D96FF;font-weight:600">Quota Detail</span> :')
                        .replace(/🧧 Name:/g,'<div style="text-align:center;padding:5px 0;margin:10px 0;background-color:#f1f5f9;border-radius:6px">━━━━━━━━━━━━━━━━━━━━━━━━</div>\n\n<span style="color:#6BCB77;font-weight:600">📦 Name</span> :')
                        .replace(/🍂 Aktif Hingga:/g,'<span style="color:#6BCB77;font-weight:600">📆 Expired</span> :')
                        .replace(/🎁 Benefit:/g,'<span style="color:#6BCB77;font-weight:600">🎁 Benefit</span> :')
                        .replace(/🎁 Tipe Kuota:/g,'<span style="color:#6BCB77;font-weight:600">🏷️ Tipe</span> :')
                        .replace(/🎁 Quota:/g,'<span style="color:#6BCB77;font-weight:600">📦 Nama</span> :')
                        .replace(/🎁 Kuota:/g,'<span style="color:#6BCB77;font-weight:600">💾 Kuota</span> :')
                        .replace(/🌲 Sisa Kuota:/g,'<span style="color:#6BCB77;font-weight:600">⏳ Sisa</span> :')
                        .replace(/\n\n\n/g,'\n\n');
                }
            
