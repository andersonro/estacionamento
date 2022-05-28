"use strict";
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function cadastro() {
        var _a, _b;
        const modelo = (_a = $("#modelo")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!modelo || !placa) {
            alert('É necessário informar MODELO e PLACA!!');
            return;
        }
        const dh = new Date();
        const entrada = dh;
        patio().adicionar({ modelo, placa, entrada });
    }
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const seg = Math.floor((mil / 60000) / 1000);
        return `${min}m e ${seg}s`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            const arr = [...ler(), veiculos];
            localStorage.setItem("patio", JSON.stringify(arr));
            render();
        }
        function adicionar(veiculo) {
            const dt = new Date();
            veiculo.id = dt.getTime().toString();
            salvar(veiculo);
        }
        function remover(veiculo) {
            const veic = ler().find(veic => veic.id === veiculo.id);
            if (!veic)
                return;
            const mAtual = new Date().getTime();
            const mPatio = new Date(veic.entrada);
            const tempo = calcTempo(mAtual - mPatio.getTime());
            if (!confirm(`O veículo permaneceu por ${tempo}, deseja encerrar?`))
                return;
            const arr = ler().filter((v) => v.id !== veic.id);
            localStorage.setItem("patio", JSON.stringify(arr));
            render();
        }
        function render() {
            const arr = ler();
            const table = document.getElementsByTagName("tbody")[0];
            table.innerHTML = "";
            if (arr.length > 0) {
                arr.forEach(veiculo => {
                    var _a;
                    const entrada = new Date(veiculo.entrada);
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${veiculo.modelo}</td>`;
                    row.innerHTML += `<td>${veiculo.placa}</td>`;
                    row.innerHTML += `<td>${entrada.toLocaleString()}</td>`;
                    row.innerHTML += `<td><button class="btn btn-danger btn-sm delete" data-id="${veiculo.id}"> Deletar </button></td>`;
                    table.appendChild(row);
                    (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                        remover(veiculo);
                    });
                });
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", cadastro);
})();
