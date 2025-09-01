// 硬件兼容性标准
const hardwareStandards = {
    xdr: {
        cpu: 16,
        memory: 256,
        systemDisk: 240,
        dataDisk: 10,
        gigabitPorts: 4,
        tenGigabitPorts: 2,
        raid: ["9460-8i", "9560-8i"]  // 支持多种RAID卡
    },
    gpt: {
        cpu: 48,
        memory: 512,
        systemDisk: 480,
        dataDisk: 32,
        gigabitPorts: 4,
        tenGigabitPorts: 2,
        raid: ["9560-16i"],
        gpuType: ["4090", "4090d"], // 转换为小写
        gpuCount: 8
    },
    'operation-gpt': {
        cpu: 48,
        memory: 512,
        systemDisk: 480,
        dataDisk: 32,
        gigabitPorts: 4,
        tenGigabitPorts: 2,
        raid: ["9560-16i"],
        gpuType: ["4090", "4090d"], // 转换为小写
        gpuCount: 4 // 运营GPT只支持4、6、8卡
    },
    'operation-traffic-gpt': {
        cpu: 48,
        memory: 512,
        systemDisk: 480,
        dataDisk: 32,
        gigabitPorts: 4,
        tenGigabitPorts: 2,
        raid: ["9560-16i"],
        gpuType: ["4090", "4090d"], // 转换为小写
        gpuCount: 8 // 运营+流量检测GPT保持8卡
    },
    'data-base': {
        cpu: 16,
        memory: 256,
        systemDisk: 480,
        dataDisk1: 12,
        dataDisk2: 28,
        gigabitPorts: 4,
        tenGigabitPorts: 2,
        raid: ["9460-8i"]
    },
    'ai-platform': {
        cpu: 48,
        memory: 512,
        systemDisk: 480,
        dataDisk1: 12,
        dataDisk2: 28,
        gigabitPorts: 4,
        tenGigabitPorts: 2,
        raid: ["9460-8i"]
    },
    aicp: {
        cpu: 48,
        memory: 512,
        systemDisk: 480,
        dataDisk1: 1.92,
        dataDisk2: 1.92,
        gigabitPorts: 4,
        tenGigabitPorts: 4,
        raid: ["9540-8i"],
        gpuType: []
    }
};

// 记录选中的场景
const selectedScenarios = {
    xdr: true, // 默认选中
    dsp: false,
    network: false,
    ai: false,
    'flow-gpt': false,
    'ops-gpt': false,
    'data-gpt': false
};

// 选择部署场景
function selectScenario(scenario) {
    const cards = safeQuerySelectorAll('.scenario-card');
    cards.forEach(card => {
        card.classList.remove('selected');
    });
    
    const targetCard = safeGetElementById(`${scenario}-card`);
    if (targetCard) {
        targetCard.classList.add('selected');
    }
}

// 查看部署详情
function viewDetails(scenario, event) {
    event.stopPropagation();
    
    // 对于数据底座部署，在当前模块展示详情
    if (scenario === 'data-base') {
        // 隐藏其他卡片，只显示数据底座详情
        const cards = safeQuerySelectorAll('.scenario-card');
        cards.forEach(card => {
            card.style.display = 'none';
        });
        
        // 显示数据底座详情内容
        const dataBaseDetails = document.createElement('div');
        dataBaseDetails.className = 'data-base-details';
        dataBaseDetails.innerHTML = `
            <div style="background: linear-gradient(145deg, #1e293b, #1a2436); border: 1px solid #334155; border-radius: 12px; padding: 30px; margin: 20px 0;">
                <div class="detail-header">
                    <h2 class="detail-title">
                        <i class="fas fa-database"></i>
                        <span>数据底座部署详情</span>
                    </h2>
                    <button class="btn btn-outline" data-action="back-to-selection" data-type="data-base">
                        <i class="fas fa-arrow-left"></i> 返回方案选择
                    </button>
                </div>
                
                <div class="tabs">
                    <div class="tab active" data-action="open-data-base-tab" data-tab="packages">软件包及工具准备</div>
                    <div class="tab" data-action="open-data-base-tab" data-tab="compatibility">软件兼容性</div>
                    <div class="tab" data-action="open-data-base-tab" data-tab="topology">部署拓扑</div>
                    <div class="tab" data-action="open-data-base-tab" data-tab="ports">端口矩阵</div>
                    <div class="tab" data-action="open-data-base-tab" data-tab="steps">部署步骤</div>
                </div>
                
                <div id="data-base-packages" class="tab-content active">
                    <h3><i class="fas fa-box-open"></i> 软件包及工具准备</h3>
                    <div class="compatibility-card">
                        <div class="card-status">
                            <div class="status-dot status-approved"></div>
                            <span>基础工具</span>
                        </div>
                        <ul class="specs">
                            <li><span class="spec-name">Chrome浏览器</span><span class="spec-value">用于访问Web控制台 <a href="https://www.google.com/chrome/" target="_blank">[官网下载]</a></span></li>
                            <li><span class="spec-name">MobaXterm软件</span>用于通过SSH访问 <a href="https://mobaxterm.mobatek.net/" target="_blank">[官网下载]</a></span></li>
                            <li><span class="spec-name">Winscp软件</span><span class="spec-value">用于异常情况下上传bin包到后台 <a href="https://winscp.net/" target="_blank">[官网下载]</a></span></li>
                        </ul>
                    </div>
                    
                    <div class="compatibility-card">
                        <div class="card-status">
                            <div class="status-dot status-warning"></div>
                            <span>部署包</span>
                        </div>
                        <ul class="specs">
                            <li><span class="spec-name">数据底座部署包</span><span class="spec-value">联系何星 99119 获取</span></li>
                        </ul>
                    </div>
                </div>
                
                <div id="data-base-compatibility" class="tab-content">
                    <h3><i class="fas fa-check-circle"></i> 软件兼容性说明</h3>
                    <p>以下为数据底座部署方案的兼容性要求：</p>
                    <div class="compatibility-grid">
                        <div class="compatibility-card">
                            <div class="card-status">
                                <div class="status-dot status-approved"></div>
                                <span>硬件部署</span>
                            </div>
                            <ul class="specs">
                                <li><span class="spec-name">适配硬件</span><span class="spec-value">XDR-C3500</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div id="data-base-topology" class="tab-content">
                    <h3><i class="fas fa-project-diagram"></i> 部署拓扑说明</h3>
                    <p>数据底座使用外部连接部署拓扑如下图所示：</p>
                    
                    <div class="topology-diagram">
                        <img src="https://support.sangfor.com.cn/_static/202508/41efe7227fe011f084e6fa163e0bdd14.png" alt="数据底座部署拓扑图" class="topology-img">
                    </div>
                    
                    <div class="topology-notes">
                        <h4>数据底座拓扑说明</h4>
                        <ol>
                            <li>数据底座采用外部连接方式部署，支持与AI安全平台集群对接;</n                                    <li>数据底座需要配置专用的数据口用于与AI安全平台通信;</n                                    <li>部署时需要确保数据底座到AI安全平台集群数据口Vip的网络连通性;</n                                    <li>数据底座支持高可用部署架构，确保数据处理的可靠性;</n                                    <li>部署完成后需要进行网络连通性测试，确保各组件正常通信。</li>
                        </ol>
                    </div>
                </div>
                
                <div id="data-base-ports" class="tab-content">
                    <h3><i class="fas fa-plug"></i> 端口矩阵说明</h3>
                    <p>以下是数据底座部署所需的端口配置：</p>
                    
                    <table class="ports-table">
                        <thead>
                            <tr>
                                <th>方向</th>
                                <th>需要放通IP/域名</th>
                                <th>需要放通的端口</th>
                                <th>用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>安全数据底座→AI安全平台</td>
                                <td>AI安全平台集群数据口Vip</td>
                                <td>TCP ALL</td>
                                <td>安全数据底座对接AI安全平台</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div id="data-base-steps" class="tab-content">
                    <h3><i class="fas fa-list-ol"></i> 部署步骤说明</h3>
                    
                    <div class="deployment-status">
                        <div class="status-indicator"></div>
                        <span>部署进度: <span id="progress-text">0%</span></span>
                    </div>
                    
                    <div class="steps-container">
                        <!-- 网络规划步骤 -->
                        <div class="step" id="step1">
                            <div class="step-number"></div>
                            <div class="step-content">
                                <h4 class="step-title"><i class="fas fa-network-wired"></i> 1、网络规划</h4>
                                <p class="step-description">规划安全数据底座集群的网络配置，包括管理口、业务口、数据口和IPMI口的IP分配。</p>
                                
                                <div style="margin-top: 15px; overflow-x: auto;">
                                    <table class="network-table">
                                        <thead>
                                            <tr>
                                                <th>集群类型</th>
                                                <th>网络平面名称</th>
                                                <th>IP规划</th>
                                                <th>作用</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td rowspan="4">安全数据底座集群<br>（以N个节点为例）</td>
                                                <td>管理口</td>
                                                <td>N+1个，需要了解网关地址</td>
                                                <td>提供集群管理界面访问</td>
                                            </tr>
                                            <tr>
                                                <td>业务口</td>
                                                <td>N+1个，需要了解网关地址</td>
                                                <td>业务数据通信使用</td>
                                            </tr>
                                            <tr>
                                                <td>数据口</td>
                                                <td>N+1个</td>
                                                <td>数据存储和内部通信使用（需要万兆光口）</td>
                                            </tr>
                                            <tr>
                                                <td>IPMI口</td>
                                                <td>N个</td>
                                                <td>远程管理接口（推荐配置，非必须）</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div class="step-actions" style="margin-top: 15px;">
                                    <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step1">标记完成</button>
                                    <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=322528">查看详情</button>
                                </div>
                                <div class="step-completed">
                                    <i class="fas fa-check"></i> 已完成
                                </div>
                            </div>
                        </div>

                        <!-- 选择平台类型和配置集群信息步骤 -->
                        <div class="steps-grid">
                            <div class="step" id="step2">
                                <div class="step-number"></div>
                                <div class="step-content">
                                    <h4 class="step-title"><i class="fas fa-cogs"></i> 2、选择平台类型</h4>
                                    <p class="step-description">根据硬件配置选择合适的部署平台类型，确保与硬件规格匹配。</p>
                                    
                                    <div class="step-actions">
                                        <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step2">标记完成</button>
                                        <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=322528">查看详情</button>
                                    </div>
                                    <div class="step-completed">
                                        <i class="fas fa-check"></i> 已完成
                                    </div>
                                </div>
                            </div>

                            <div class="step" id="step3">
                                <div class="step-number"></div>
                                <div class="step-content">
                                    <h4 class="step-title"><i class="fas fa-server"></i> 3、配置集群信息</h4>
                                    <p class="step-description">将各节点添加到集群中，配置节点角色和功能分配。</p>
                                    
                                    <div class="step-actions">
                                        <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step3">标记完成</button>
                                        <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=322528">查看详情</button>
                                    </div>
                                    <div class="step-completed">
                                        <i class="fas fa-check"></i> 已完成
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 集群初始化和业务初始化步骤 -->
                        <div class="steps-grid">
                            <div class="step" id="step4">
                                <div class="step-number"></div>
                                <div class="step-content">
                                    <h4 class="step-title"><i class="fas fa-play-circle"></i> 4、集群初始化</h4>
                                    <p class="step-description">初始化集群基础服务，包括认证服务、日志服务和监控服务。</p>
                                    
                                    <div class="step-actions">
                                        <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step4">标记完成</button>
                                        <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=322528">查看详情</button>
                                    </div>
                                    <div class="step-completed">
                                        <i class="fas fa-check"></i> 已完成
                                    </div>
                                </div>
                            </div>

                            <div class="step" id="step5">
                                <div class="step-number"></div>
                                <div class="step-content">
                                    <h4 class="step-title"><i class="fas fa-chart-line"></i> 5、业务初始化</h4>
                                    <p class="step-description">初始化业务服务，包括数据湖、监控服务等核心功能。</p>
                                    
                                    <div class="step-actions">
                                        <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step5">标记完成</button>
                                        <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=322528">查看详情</button>
                                    </div>
                                    <div class="step-completed">
                                        <i class="fas fa-check"></i> 已完成
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 获取授权步骤 -->
                        <div class="step" id="step6">
                            <div class="step-number"></div>
                            <div class="step-content">
                                <h4 class="step-title"><i class="fas fa-key"></i> 6、获取授权</h4>
                                <p class="step-description">配置集群授权信息，包括许可证导入和功能授权。</p>
                                
                                <div class="step-actions">
                                    <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step6">标记完成</button>
                                    <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=322528">查看详情</button>
                                </div>
                                <div class="step-completed">
                                    <i class="fas fa-check"></i> 已完成
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 插入到AI安全平台区域
        const aiPlatformSection = safeGetElementById('ai-platform-section');
        if (aiPlatformSection) {
            aiPlatformSection.appendChild(dataBaseDetails);
            
            // 重新绑定动态生成元素的事件
            bindDynamicEvents();
            
            // 默认激活第一个标签页
            setTimeout(() => {
                openDataBaseTab('packages');
            }, 100);
        }
        
        return;
    }
    
    // 对于AICP部署，使用通用详情展示
    if (scenario === 'aicp') {
        // 设置AICP特定的配置
        scenario = 'aicp';
    }
    
    // 对于AI安全平台部署，使用通用详情展示
    if (scenario === 'ai-platform') {
        // 设置AI安全平台特定的配置
        scenario = 'ai-platform';
    }
    
    // 在部署方案建议框中显示详情
    const recommendation = safeGetElementById('deployment-recommendation');
    const scenarioSections = safeQuerySelectorAll('.scenario-section');
    
    // 隐藏所有场景卡片，只显示详情
    const cards = safeQuerySelectorAll('.scenario-card');
    cards.forEach(card => {
        card.style.display = 'none';
    });
    
    // 确保部署方案建议框显示
    if (recommendation) {
        recommendation.style.display = 'block';
    }
    
    // 创建详情内容
    const detailContent = document.createElement('div');
    detailContent.className = 'deployment-details';
    detailContent.innerHTML = `
        <div style="margin-top: 20px; background: linear-gradient(145deg, #1e293b, #1a2436); border: 1px solid #334155; border-radius: 12px; padding: 25px;">
            <div class="detail-header">
                <h2 class="detail-title">
                    <i class="fas ${scenario === 'gpt' ? 'fa-robot' : scenario === 'ai-platform' ? 'fa-brain' : scenario === 'aicp' ? 'fa-cogs' : 'fa-shield-alt'}"></i>
                    <span>${scenario === 'gpt' ? 'GPT' : scenario === 'ai-platform' ? 'AI安全平台' : scenario === 'aicp' ? 'AICP' : 'XDR'} 部署详情</span>
                </h2>
                <button class="btn btn-outline" data-action="back-to-selection" data-type="scenario">
                    <i class="fas fa-arrow-left"></i> 返回方案选择
                </button>
            </div>
            
            <div class="tabs">
                <div class="tab active" data-action="open-detail-tab" data-tab="packages">软件包及工具准备</div>
                <div class="tab" data-action="open-detail-tab" data-tab="compatibility">软件兼容性</div>
                <div class="tab" data-action="open-detail-tab" data-tab="topology">部署拓扑</div>
                <div class="tab" data-action="open-detail-tab" data-tab="ports">端口矩阵</div>
                <div class="tab" data-action="open-detail-tab" data-tab="steps">部署步骤</div>
            </div>
            
            <div id="detail-packages" class="tab-content active">
                <h3><i class="fas fa-box-open"></i> 软件包及工具准备</h3>
                <div class="compatibility-card">
                    <div class="card-status">
                        <div class="status-dot status-approved"></div>
                        <span>基础工具</span>
                    </div>
                    <ul class="specs">
                        <li><span class="spec-name">Chrome浏览器</span><span class="spec-value">用于访问Web控制台 <a href="https://www.google.com/chrome/" target="_blank">[官网下载]</a></span></li>
                        <li><span class="spec-name">MobaXterm软件</span>用于通过SSH访问 <a href="https://mobaxterm.mobatek.net/" target="_blank">[官网下载]</a></span></li>
                        <li><span class="spec-name">Winscp软件</span><span class="spec-value">用于异常情况下上传bin包到后台 <a href="https://winscp.net/" target="_blank">[官网下载]</a></span></li>
                    </ul>
                </div>
                
                ${scenario === 'gpt' ? `
                <div class="compatibility-card">
                    <div class="card-status">
                        <div class="status-dot status-warning"></div>
                        <span>升级包(仅老版本升级需要)</span>
                    </div>
                    <ul class="specs">
                        <li><span class="spec-name">XDR_GPT_SYSTEM_*.bin</span><span class="spec-value">运营+检测GPT系统升级包</span></li>
                        <li><span class="spec-name">SEC_GPT_SYSTEM_*.bin</span><span class="spec-value">纯检测GPT系统升级包</span></li>
                    </ul>
                </div>
                ` : scenario === 'ai-platform' || scenario === 'aicp' ? `
                <div class="compatibility-card">
                    <div class="card-status">
                        <div class="status-dot status-warning"></div>
                        <span>部署包</span>
                    </div>
                    <ul class="specs">
                        <li><span class="spec-name">${scenario === 'ai-platform' ? 'AI安全平台' : 'AICP'}部署包</span><span class="spec-value">联系何星 99119 获取</span></li>
                    </ul>
                </div>
                ` : `
                <div class="compatibility-card">
                    <div class="card-status">
                        <div class="status-dot status-warning"></div>
                        <span>虚拟化部署专用(仅虚拟化部署需要)</span>
                    </div>
                    <ul class="specs">
                        <li><span class="spec-name">qcow2镜像包</span><span class="spec-value">用于导入基础镜像</span></li>
                        <li><span class="spec-name">业务初始化/bin包</span><span class="spec-value">用于业务初始化</span></li>
                    </ul>
                </div>
                
                <div class="compatibility-card">
                    <div class="card-status">
                        <div class="status-dot status-warning"></div>
                        <span>升级包(仅老版本升级需要)</span>
                    </div>
                    <ul class="specs">
                        <li><span class="spec-name">XDR-2.0.42_Deploy_*.bin</span><span class="spec-value">XDR系统升级包</span></li>
                    </ul>
                </div>
                `}
            </div>
            
            <div id="detail-compatibility" class="tab-content">
                <h3><i class="fas fa-check-circle"></i> 软件兼容性说明</h3>
                <p>以下为当前部署方案的兼容性要求：</p>
                
                <div class="compatibility-grid">
                    <div class="compatibility-card">
                        <div class="card-status">
                            <div class="status-dot status-approved"></div>
                            <span>硬件部署</span>
                        </div>
                        <ul class="specs">
                            <li><span class="spec-name">适配硬件</span><span class="spec-value">${scenario === 'gpt' ? 'H8230及宽恒设备' : scenario === 'ai-platform' ? 'XDR-D3700' : 'XDR-C3500、XDR-D3700'}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div id="detail-topology" class="tab-content">
                ${scenario === 'ai-platform' ? `
                <h3><i class="fas fa-project-diagram"></i> 部署拓扑说明</h3>
                <p>AI安全平台使用外部连接部署拓扑如下图所示：</p>
                
                <div class="topology-diagram">
                    <img src="https://support.sangfor.com.cn/_static/202508/41efe7227fe011f084e6fa163e0bdd14.png" alt="AI安全平台部署拓扑图" class="topology-img">
                </div>
                
                <div class="topology-notes">
                    <h4>AI安全平台拓扑说明</h4>
                    <ol>
                        <li>AI安全平台采用外部连接方式部署，支持与数据底座集群对接;</li>
                        <li>AI安全平台需要配置专用的数据口用于与数据底座通信;</li>
                        <li>部署时需要确保AI安全平台到数据底座集群数据口Vip的网络连通性;</li>
                        <li>AI安全平台支持高可用部署架构，确保AI分析服务的可靠性;</li>
                        <li>部署完成后需要进行网络连通性测试，确保各组件正常通信。</li>
                    </ol>
                </div>
                ` : `
                <h3><i class="fas fa-project-diagram"></i> 部署拓扑说明</h3>
                <p>XDR跟GPT集群的整体拓扑如下图所示：</p>
                
                <div class="topology-diagram">
                    <img src="https://support.sangfor.com.cn/_static/202507/83e7f54f61e511f084e6fa163e0bdd14.png" alt="XDR与GPT部署拓扑图" class="topology-img">
                </div>
                
                <div class="topology-notes">
                    <h4>拓扑说明</h4>
                    <ol>
                        <li>XDR跟GPT集群在2.0.42版本之后变成两个独立的集群，增加架构以及部署的灵活性（支持信创GPT集群对接非信创XDR集群，反之亦然），支持能力单独演进，老架构（版本小于等于2.0.40）的XDR跟GPT在同一个集群耦合度比较高，不利于单独的能力演进；</li>
                        <li>XDR集群至少需要3节点起步做一个集群，GPT集群则不同，GPT集群至少需要1节点起步做集群；</li>
                        <li>XDR跟GPT两个集群都支持管理口、业务口复用，数据口必须为单独的网口，目前数据口主要涉及两个集群通信的流量；</li>
                        <li>GPT集群为1个节点的时候，也需要做集群，便于后续扩容演进，同样也需要接入数据口，否则集群无法正常使用；</li>
                        <li>XDR集群跟GPT集群对接时，使用数据口进行对接，需要XDR集群数据口到GPT集群数据口Vip以及GPT集群数据口到XDR集群数据口Vip双向放通相关的网络权限，请务必注意</li>
                        <li>XDR支持虚拟化部署，GPT集群只支持适配硬件部署，详细兼容性信息请查看兼容性列表；</li>
                        <li>只有XDR集群时也需要填写数据口Vip;</li>
                    </ol>
                </div>
                `}
            </div>
            
            <div id="detail-ports" class="tab-content">
                ${scenario === 'ai-platform' ? `
                <h3><i class="fas fa-plug"></i> 端口矩阵说明</h3>
                <p>以下是AI安全平台部署所需的端口配置：</p>
                
                <table class="ports-table">
                    <thead>
                        <tr>
                            <th>方向</th>
                            <th>需要放通IP/域名</th>
                            <th>需要放通的端口</th>
                            <th>用途</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AI安全平台→安全数据底座</td>
                            <td>安全数据底座集群数据口Vip</td>
                            <td>TCP ALL</td>
                            <td>AI安全平台对接安全数据底座</td>
                        </tr>
                    </tbody>
                </table>
                ` : `
                <h3><i class="fas fa-plug"></i> 端口矩阵说明</h3>
                <p>以下是XDR和GPT部署所需的端口配置：</p>
                
                <table class="ports-table">
                    <thead>
                        <tr>
                            <th>服务名称</th>
                            <th>端口号</th>
                            <th>协议</th>
                            <th>方向</th>
                            <th>用途说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>XDR-GPT通信</td>
                            <td>31001,31003,31004,443</td>
                            <td>TCP</td>
                            <td>双向</td>
                            <td>XDR与GPT集群间通信</td>
                        </tr>
                    </tbody>
                </table>
                `}
            </div>
            
            <div id="detail-steps" class="tab-content">
                <h3><i class="fas fa-list-ol"></i> 部署步骤说明</h3>
                
                <div class="deployment-status">
                    <div class="status-indicator"></div>
                    <span>部署进度: <span id="progress-text">0%</span></span>
                </div>
                
                <div class="steps-container">
                    ${scenario === 'aicp' ? `
                    <!-- AICP部署步骤 -->
                    <div class="step" id="step1">
                        <div class="step-number"></div>
                        <div class="step-content">
                            <h4 class="step-title"><i class="fas fa-microchip"></i> 1、裸金属设备刷机（一体机无需关注）</h4>
                            <p class="step-description">为裸金属设备安装操作系统，准备AICP部署环境。</p>
                            <div class="step-actions">
                                <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step1">标记完成</button>
                                <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=327179">查看详情</button>
                            </div>
                            <div class="step-completed">
                                <i class="fas fa-check"></i> 已完成
                            </div>
                        </div>
                    </div>
                    
                    <div class="steps-grid">
                        <div class="step" id="step2">
                            <div class="step-number"></div>
                            <div class="step-content">
                                <h4 class="step-title"><i class="fas fa-key"></i> 2、SCP授权</h4>
                                <p class="step-description">为平台获取SKE和AICP授权，确保功能完整可用。</p>
                                <div class="step-actions">
                                    <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step2">标记完成</button>
                                    <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=327177">查看详情</button>
                                </div>
                                <div class="step-completed">
                                    <i class="fas fa-check"></i> 已完成
                                </div>
                            </div>
                        </div>
                        
                        <div class="step" id="step3">
                            <div class="step-number"></div>
                            <div class="step-content">
                                <h4 class="step-title"><i class="fas fa-cogs"></i> 3、SKE配置</h4>
                                <p class="step-description">配置容器相关环境，为AICP提供运行基础。</p>
                                <div class="step-actions">
                                    <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step3">标记完成</button>
                                    <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=327178">查看详情</button>
                                </div>
                                <div class="step-completed">
                                    <i class="fas fa-check"></i> 已完成
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="steps-grid">
                        <div class="step" id="step4">
                            <div class="step-number"></div>
                            <div class="step-content">
                                <h4 class="step-title"><i class="fas fa-brain"></i> 4、AICP配置</h4>
                                <p class="step-description">配置大模型的相关对外服务环境，启用AI能力。</p>
                                <div class="step-actions">
                                    <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step4">标记完成</button>
                                    <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=327181">查看详情</button>
                                </div>
                                <div class="step-completed">
                                    <i class="fas fa-check"></i> 已完成
                                </div>
                            </div>
                        </div>
                        
                        <div class="step" id="step5">
                            <div class="step-number"></div>
                            <div class="step-content">
                                <h4 class="step-title"><i class="fas fa-upload"></i> 5、模型导入</h4>
                                <p class="step-description">导入检测、运营以及数据安全等模型，完善AI功能。</p>
                                <div class="step-actions">
                                    <button class="btn btn-sm btn-success" data-action="complete-step" data-step="step5">完成部署</button>
                                    <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=327618">查看详情</button>
                                </div>
                                <div class="step-completed">
                                    <i class="fas fa-check"></i> 已完成
                                </div>
                            </div>
                        </div>
                    </div>
                    ` : `
                    <!-- 通用部署步骤 -->
                    <div class="step" id="step1">
                        <div class="step-number"></div>
                        <div class="step-content">
                            <h4 class="step-title">1. 网络规划</h4>
                            <p class="step-description">规划XDR和GPT集群的网络配置，包括管理口、IPMI口、业务口和数据口的IP分配。</p>
                            
                            <div style="margin-top: 15px; overflow-x: auto;">
                                <table class="network-table">
                                    <thead>
                                        <tr>
                                            <th>集群类型</th>
                                            <th>网络平面名称</th>
                                            <th>IP规划</th>
                                            <th>作用</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td rowspan="4">XDR集群</td>
                                            <td>管理口网络</td>
                                            <td>N台服务器需要N+1个IP，需要了解网关地址</td>
                                            <td>提供分布式XDR对外WebUI访问</td>
                                        </tr>
                                        <tr>
                                            <td>IPMI口网络</td>
                                            <td>N台服务器需要N个IP，需要了解网关地址</td>
                                            <td>IPMI接口通信使用，避免管理网络无法连接上</td>
                                        </tr>
                                        <tr>
                                            <td>业务口网络</td>
                                            <td>支持复用管理口，非复用场景下，N台服务器需要N+1个IP</td>
                                            <td>组件上报数据给分布式XDR分析</td>
                                        </tr>
                                        <tr>
                                            <td>数据口网络</td>
                                            <td>N台服务器需要N+1个IP</td>
                                            <td>微服务内部通信使用以及集群对接使用</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="4">GPT集群</td>
                                            <td>管理口网络</td>
                                            <td>N台服务器需要N+1个IP，需要了解网关地址</td>
                                            <td>提供分布式XDR对外WebUI访问</td>
                                        </tr>
                                        <tr>
                                            <td>IPMI口网络</td>
                                            <td>N台服务器需要N个IP，需要了解网关地址</td>
                                            <td>IPMI接口通信使用，避免管理网络无法连接上</td>
                                        </tr>
                                        <tr>
                                            <td>业务口网络</td>
                                            <td>支持复用管理口，非复用场景下，N台服务器需要N+1个IP</td>
                                            <td>组件上报数据给分布式XDR分析</td>
                                        </tr>
                                        <tr>
                                            <td>数据口网络</td>
                                            <td>N台服务器需要N+1个IP</td>
                                            <td>微服务内部通信使用以及集群对接使用</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="step-actions" style="margin-top: 15px;">
                                <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step1">标记完成</button>
                                <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=327611">查看详情</button>
                            </div>
                            <div class="step-completed">
                                <i class="fas fa-check"></i> 已完成
                            </div>
                        </div>
                    </div>
                    
                    <div class="steps-grid">
                        <div class="step" id="step2">
                            <div class="step-number"></div>
                            <div class="step-content">
                                <h4 class="step-title">2. 配置各节点网络</h4>
                                <p class="step-description">配置所有节点的网络参数，包括IP地址、子网掩码、网关和DNS设置，确保节点间网络互通。</p>
                                <div class="step-actions">
                                    <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step2">标记完成</button>
                                    <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=324607">查看详情</button>
                                </div>
                                <div class="step-completed">
                                    <i class="fas fa-check"></i> 已完成
                                </div>
                            </div>
                        </div>
                        
                        <div class="step" id="step3">
                            <div class="step-number"></div>
                            <div class="step-content">
                                <h4 class="step-title">3. 添加节点</h4>
                                <p class="step-description">将各节点添加到集群中，配置节点角色和功能分配。</p>
                                <div class="step-actions">
                                    <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step3">标记完成</button>
                                    <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=324607">查看详情</button>
                                </div>
                                <div class="step-completed">
                                    <i class="fas fa-check"></i> 已完成
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="steps-grid">
                        <div class="step" id="step4">
                            <div class="step-number"></div>
                            <div class="step-content">
                                <h4 class="step-title">4. 集群基础服务初始化</h4>
                                <p class="step-description">初始化集群基础服务，包括认证服务、日志服务和监控服务。</p>
                                <div class="step-actions">
                                    <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step4">标记完成</button>
                                    <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=324607">查看详情</button>
                                </div>
                                <div class="step-completed">
                                    <i class="fas fa-check"></i> 已完成
                                </div>
                            </div>
                        </div>
                        
                        <div class="step" id="step5">
                            <div class="step-number"></div>
                            <div class="step-content">
                                <h4 class="step-title">5. 集群授权</h4>
                                <p class="step-description">配置集群授权信息，包括许可证导入和功能授权。</p>
                                <div class="step-actions">
                                    <button class="btn btn-sm btn-primary" data-action="complete-step" data-step="step5">标记完成</button>
                                    <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=324607">查看详情</button>
                                </div>
                                <div class="step-completed">
                                    <i class="fas fa-check"></i> 已完成
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="step" id="step6">
                        <div class="step-number"></div>
                        <div class="step-content">
                            <h4 class="step-title">6. 集群业务服务初始化</h4>
                            <p class="step-description">初始化业务服务，包括安全分析引擎、威胁检测服务和响应工作台。</p>
                            <div class="step-actions">
                                <button class="btn btn-sm btn-success" data-action="complete-step" data-step="step6">完成部署</button>
                                <button class="btn btn-sm btn-secondary" data-action="open-url" data-url="https://support.sangfor.com.cn/productDocument/read?product_id=212&version_id=1114&category_id=324607">查看详情</button>
                            </div>
                            <div class="step-completed">
                                <i class="fas fa-check"></i> 已完成
                            </div>
                        </div>
                    </div>
                    `}
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(30, 41, 59, 0.7); border-radius: 8px; border: 1px solid #334155;">
                    <p><i class="fas fa-clock"></i> <strong>预计部署时间:</strong> ${scenario === 'gpt' ? '45-60' : scenario === 'ai-platform' ? '75-105' : scenario === 'aicp' ? '60-90' : '30-45'}分钟 (不包含上传包时间)</p>
                </div>
            </div>
        </div>
    `;
    
    // 添加详情内容到部署方案建议框
    if (recommendation) {
        recommendation.appendChild(detailContent);
        
        // 重新绑定动态生成元素的事件
        bindDynamicEvents();
        
        // 默认激活第一个标签页
        setTimeout(() => {
            openDetailTab('packages');
        }, 100);
    }
    
    // 滚动到详情内容
    setTimeout(() => {
        detailContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    // 重置所有显示元素
    const gptPackages = safeGetElementById('gpt-packages');
    const xdrPackages = safeGetElementById('xdr-packages');
    const dataBasePorts = safeGetElementById('data-base-ports');
    const dataBaseTopology = safeGetElementById('data-base-topology');
    
    if (gptPackages) gptPackages.style.display = 'none';
    if (xdrPackages) xdrPackages.style.display = 'none';
    if (dataBasePorts) dataBasePorts.style.display = 'none';
    if (dataBaseTopology) dataBaseTopology.style.display = 'none';
    
    // 重置标签页状态
    const tabs = safeQuerySelectorAll('.tab');
    const tabContents = safeQuerySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 激活第一个标签页和对应的内容
    const firstTab = safeQuerySelector('.tab');
    if (firstTab) {
        firstTab.classList.add('active');
        const tabId = firstTab.dataset.tab;
        if (tabId) {
            const targetContent = safeGetElementById(`detail-${tabId}`);
            if (targetContent) targetContent.classList.add('active');
        }
    }
    
    // 重置所有步骤为未完成状态
    const steps = safeQuerySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('completed');
    });
    updateProgress();
}

// 返回方案选择
function backToSelection() {
    const scenarioSections = safeQuerySelector('.scenario-sections');
    const hardwareSections = safeQuerySelectorAll('.hardware-section');
    const detailSection = safeGetElementById('detail-section');
    
    if (scenarioSections) {
        scenarioSections.style.display = 'block';
    }
    
    hardwareSections.forEach(section => {
        if (section) {
            section.style.display = 'block';
        }
    });
    
    if (detailSection) {
        detailSection.style.display = 'none';
    }
}

// 返回数据底座方案选择
function backToDataBaseSelection() {
    // 移除数据底座详情
    const dataBaseDetails = safeQuerySelector('.data-base-details');
    if (dataBaseDetails) {
        dataBaseDetails.remove();
    }
    
    // 重新显示所有卡片
    safeQuerySelectorAll('.scenario-card').forEach(card => {
        card.style.display = 'block';
    });
}

// 打开数据底座标签页
function openDataBaseTab(tabId, event) {
    safeQuerySelectorAll('#ai-platform-section .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    safeQuerySelectorAll('#ai-platform-section .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.classList.add('active');
        const tabId = event.target.dataset.tab;
        if (tabId) {
            const targetContent = safeGetElementById(`data-base-${tabId}`);
            if (targetContent) targetContent.classList.add('active');
        }
    } else {
        // 如果没有事件，默认激活第一个标签页
        const firstTab = safeQuerySelector('#ai-platform-section .tab');
        if (firstTab) {
            firstTab.classList.add('active');
            const tabId = firstTab.dataset.tab;
            if (tabId) {
                const targetContent = safeGetElementById(`data-base-${tabId}`);
                if (targetContent) targetContent.classList.add('active');
            }
        }
    }
}

// 切换标签页
function openTab(tabId, event) {
    safeQuerySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    safeQuerySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
    const targetElement = safeGetElementById(tabId);
    if (targetElement) targetElement.classList.add('active');
}

// 切换部署详情标签页
function openDetailTab(tabId, event) {
    // 移除所有标签的激活状态
    safeQuerySelectorAll('.deployment-details .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 隐藏所有标签内容
    safeQuerySelectorAll('.deployment-details .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 激活当前标签
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // 显示对应内容
    const targetElement = safeGetElementById(`detail-${tabId}`);
    if (targetElement) targetElement.classList.add('active');
}

// 切换硬件检测标签
function switchHardwareTab(tab) {
    safeQuerySelectorAll('.hardware-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    safeQuerySelectorAll('.hardware-form').forEach(form => {
        form.style.display = 'none';
    });
    
    const targetTab = safeQuerySelector(`.hardware-tab[onclick="switchHardwareTab('${tab}')"]`);
    if (targetTab) targetTab.classList.add('active');
    const targetForm = safeGetElementById(`${tab}-form`);
    if (targetForm) {
        targetForm.style.display = 'block';
    }
    
    // 如果是AI安全平台，默认显示数据底座表单
    if (tab === 'ai-security') {
        switchAISecurityTab('data-base');
    }
    
    // 如果是XDR+GPT部署方案，默认显示X86 XDR内容
    if (tab === 'xdr-gpt') {
        switchXDRGPTTab('xdr');
    }
}

// 切换虚拟化部署标签
function switchVirtualizationTab(tab) {
    safeQuerySelectorAll('.virtualization-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    safeQuerySelectorAll('.virtualization-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetTab = safeQuerySelector(`.virtualization-tab[onclick="switchVirtualizationTab('${tab}')"]`);
    if (targetTab) targetTab.classList.add('active');
    const targetContent = safeGetElementById(`${tab}-virtualization`);
    if (targetContent) targetContent.classList.add('active');
}

// 切换AI安全平台检测标签
function switchAISecurityTab(tab) {
    safeQuerySelectorAll('#ai-security-form .hardware-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    safeQuerySelectorAll('.ai-security-subform').forEach(form => {
        form.style.display = 'none';
    });
    
    const targetTab = safeQuerySelector(`#ai-security-form .hardware-tab[onclick="switchAISecurityTab('${tab}')"]`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    const targetForm = safeGetElementById(`${tab}-form`);
    if (targetForm) {
        targetForm.style.display = 'block';
    }
}

// 切换XDR+GPT部署方案检测标签
function switchXDRGPTTab(tab) {
    safeQuerySelectorAll('#xdr-gpt-form .hardware-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    safeQuerySelectorAll('.xdr-gpt-subform').forEach(form => {
        form.style.display = 'none';
    });
    
    const targetTab = safeQuerySelector(`#xdr-gpt-form .hardware-tab[onclick="switchXDRGPTTab('${tab}')"]`);
    if (targetTab) targetTab.classList.add('active');
    const targetForm = safeGetElementById(`xdr-gpt-${tab}-form`);
    if (targetForm) targetForm.style.display = 'block';
}

// 处理XDR+GPT子选项显示
function handleXdrGptSubtabs(tab) {
    const xdrGptSubtabs = safeGetElementById('xdr-gpt-subtabs');
    
    // 只处理XDR+GPT相关的标签
    if (tab === 'xdr-gpt') {
        xdrGptSubtabs.style.display = 'flex';
        // 默认选择X86 XDR
        switchAISecurityTab('xdr');
        return true;
    } else if (tab === 'xdr' || tab === 'gpt') {
        // XDR和GPT子标签，显示子标签区域但不拦截正常流程
        xdrGptSubtabs.style.display = 'flex';
        return false; // 返回false让正常tab切换逻辑继续执行
    } else {
        // AI安全平台相关标签（data-base, ai-platform, aicp），隐藏子标签区域
        xdrGptSubtabs.style.display = 'none';
        return false; // 返回false让正常tab切换逻辑继续执行
    }
}

// 重写switchAISecurityTab函数
const originalSwitchAISecurityTab = window.switchAISecurityTab;
window.switchAISecurityTab = function(tab) {
    console.log('switchAISecurityTab called with:', tab);
    safeQuerySelectorAll('#ai-security-form .hardware-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    safeQuerySelectorAll('.ai-security-subform').forEach(form => {
        form.style.display = 'none';
    });
    
    // 处理XDR+GPT子选项
    if (handleXdrGptSubtabs(tab)) {
        return;
    }
    
    const targetTab = safeQuerySelector(`#ai-security-form .hardware-tab[onclick="switchAISecurityTab('${tab}')"]`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    const targetForm = safeGetElementById(`${tab}-form`);
    if (targetForm) {
        targetForm.style.display = 'block';
    }
};

// 切换场景选项
function toggleScenario(scenario) {
    // XDR场景不允许取消选择
    if (scenario === 'xdr') return;
    
    const checkbox = safeGetElementById(`scenario-${scenario}`);
    if (!checkbox) return;
    
    checkbox.checked = !checkbox.checked;
    selectedScenarios[scenario] = checkbox.checked;
    
    // 通过data属性找到对应的选项元素
    const optionElement = safeQuerySelector(`[data-scenario="${scenario}"]`);
    if (optionElement) {
        if (checkbox.checked) {
            optionElement.classList.add('selected');
        } else {
            optionElement.classList.remove('selected');
        }
    }
}

// 确认场景选择
function confirmScenarios() {
    const recommendation = safeGetElementById('deployment-recommendation');
    const textElement = safeGetElementById('recommendation-text');
    
    if (!recommendation || !textElement) return;
    
    // 检查组合条件
    const useAISecurityPlatform = 
        selectedScenarios.network || 
        selectedScenarios.ai ||
        (selectedScenarios['data-gpt'] && selectedScenarios['flow-gpt']) ||
        (selectedScenarios['data-gpt'] && selectedScenarios['ops-gpt']) ||
        (selectedScenarios.xdr && selectedScenarios.dsp);
    
    // 显示对应的部署方案
    const xdrGptSection = safeGetElementById('xdr-gpt-section');
    const aiPlatformSection = safeGetElementById('ai-platform-section');
    
    if (xdrGptSection) {
        xdrGptSection.style.display = !useAISecurityPlatform ? 'flex' : 'none';
    }
    
    if (aiPlatformSection) {
        aiPlatformSection.style.display = useAISecurityPlatform ? 'flex' : 'none';
    }
    
    if (useAISecurityPlatform) {
        textElement.innerHTML = '请使用 <strong>AI安全平台 (3台XDR-C3500 + 3台XDR-D3700 + AICP)</strong> 进行交付';
    } else {
        textElement.innerHTML = '请使用 <strong>XDR+GPT部署方案</strong> 进行交付';
    }
    
    recommendation.style.display = 'block';
    
    // 滚动到部署方案区域
    setTimeout(() => {
        scrollToSection('scenario-section');
    }, 300);
}

// 检查硬件兼容性
function checkCompatibility(type) {
    const resultBox = safeGetElementById('compatibility-result');
    const resultText = safeGetElementById('result-text');
    
    if (!resultBox || !resultText) {
        console.error('Compatibility result elements not found');
        return;
    }
    
    // 获取输入值
    const cpuInput = safeGetElementById(`${type}-cpu-info`);
    const memoryInput = safeGetElementById(`${type}-memory-info`);
    const systemDiskInput = safeGetElementById(`${type}-system-disk`);
    
    const cpu = cpuInput ? parseInt(cpuInput.value) || 0 : 0;
    const memory = memoryInput ? parseInt(memoryInput.value) || 0 : 0;
    const systemDisk = systemDiskInput ? parseInt(systemDiskInput.value) || 0 : 0;
    let dataDisk1 = 0;
    let dataDisk2 = 0;
    let dataDisk = 0;
    
    if (type === 'data-base' || type === 'ai-platform' || type === 'aicp') {
        const dataDisk1Input = safeGetElementById(`${type}-data-disk1`);
        const dataDisk2Input = safeGetElementById(`${type}-data-disk2`);
        dataDisk1 = dataDisk1Input ? parseFloat(dataDisk1Input.value) || 0 : 0;
        dataDisk2 = dataDisk2Input ? parseFloat(dataDisk2Input.value) || 0 : 0;
    } else {
        const dataDiskInput = safeGetElementById(`${type}-data-disk`);
        dataDisk = dataDiskInput ? parseFloat(dataDiskInput.value) || 0 : 0;
    }
    
    const gigabitPortsInput = safeGetElementById(`${type}-gigabit-ports`);
    const tenGigabitPortsInput = safeGetElementById(`${type}-ten-gigabit-ports`);
    const raidInput = safeGetElementById(`${type}-raid-info`);
    
    const gigabitPorts = gigabitPortsInput ? parseInt(gigabitPortsInput.value) || 0 : 0;
    const tenGigabitPorts = tenGigabitPortsInput ? parseInt(tenGigabitPortsInput.value) || 0 : 0;
    const raid = raidInput ? raidInput.value.trim().toLowerCase() : '';
    
    // GPT特有参数
    let gpuType = "";
    let gpuCount = 0;
    if(type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
        const gpuTypeInput = safeGetElementById(`${type}-gpu-type`);
        const gpuCountInput = safeGetElementById(`${type}-gpu-count`);
        gpuType = gpuTypeInput ? gpuTypeInput.value.trim().toLowerCase() : '';
        gpuCount = gpuCountInput ? parseInt(gpuCountInput.value) || 0 : 0;
    }
    
    // 获取标准配置
    const standard = hardwareStandards[type];
    
    // 检查各项参数
    const cpuPass = cpu >= standard.cpu;
    const memoryPass = memory >= standard.memory;
    const systemDiskPass = systemDisk >= standard.systemDisk;
    const dataDisk1Pass = (type === 'data-base' || type === 'ai-platform' || type === 'aicp') ? dataDisk1 >= standard.dataDisk1 : true;
    const dataDisk2Pass = (type === 'data-base' || type === 'ai-platform' || type === 'aicp') ? dataDisk2 >= standard.dataDisk2 : true;
    const dataDiskPass = (type !== 'data-base' && type !== 'ai-platform' && type !== 'aicp') ? dataDisk >= standard.dataDisk : true;
    const gigabitPortsPass = gigabitPorts >= standard.gigabitPorts;
    const tenGigabitPortsPass = tenGigabitPorts >= standard.tenGigabitPorts;
    
    // 检查RAID卡是否匹配（支持多种型号）
    const raidMatch = standard.raid.some(card => 
        raid.includes(card.toLowerCase())
    );
    
    // GPU特有检查
    let gpuTypePass = true;
    let gpuCountPass = true;
    if(type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
        gpuTypePass = standard.gpuType.includes(gpuType);
        // 对于运营GPT，显卡数量必须是4、6、8
        if (type === 'operation-gpt') {
            gpuCountPass = [4, 6, 8].includes(gpuCount);
        } else {
            gpuCountPass = gpuCount >= standard.gpuCount;
        }
    }
    
    // 检查所有硬件参数是否达标（不包括RAID卡和GPU）
    let hardwarePass = cpuPass && memoryPass && systemDiskPass && gigabitPortsPass && tenGigabitPortsPass;
    
    // 根据类型添加数据盘检查
    if (type === 'data-base' || type === 'ai-platform' || type === 'aicp') {
        hardwarePass = hardwarePass && dataDisk1Pass && dataDisk2Pass;
    } else {
        hardwarePass = hardwarePass && dataDiskPass;
    }
    
    // 对于GPT，显卡数量是否达标也计入硬件参数
    if (type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
        hardwarePass = hardwarePass && gpuCountPass;
    }
    
    // 情况1：完全符合，包括RAID卡和GPU(如果适用)
    if (hardwarePass && raidMatch && (type !== 'gpt' && type !== 'operation-gpt' && type !== 'operation-traffic-gpt' || 
        ((type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') && gpuTypePass))) {
        resultBox.className = 'result-box result-success';
        let resultHTML = `
            <i class="fas fa-check-circle"></i> <strong>硬件配置完全符合要求，可以直接部署。</strong>
            <br><br>
            <table style="width:100%; border-collapse: collapse;">
                <tr>
                    <td style="padding:5px;"><strong>CPU:</strong></td>
                    <td style="padding:5px;">${cpu}核 (要求: ≥${standard.cpu}核)</td>
                    <td style="padding:5px; color:${cpuPass ? 'var(--success)' : 'var(--danger)'}">${cpuPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>内存:</strong></td>
                    <td style="padding:5px;">${memory}GB (要求: ≥${standard.memory}GB)</td>
                    <td style="padding:5px; color:${memoryPass ? 'var(--success)' : 'var(--danger)'}">${memoryPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>系统盘:</strong></td>
                    <td style="padding:5px;">${systemDisk}GB (要求: ≥${standard.systemDisk}GB)</td>
                    <td style="padding:5px; color:${systemDiskPass ? 'var(--success)' : 'var(--danger)'}">${systemDiskPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                ${(type === 'data-base' || type === 'ai-platform' || type === 'aicp') ? `
                <tr>
                    <td style="padding:5px;"><strong>数据盘1:</strong></td>
                    <td style="padding:5px;">${dataDisk1}TB (要求: ≥${standard.dataDisk1}TB)</td>
                    <td style="padding:5px; color:${dataDisk1Pass ? 'var(--success)' : 'var(--danger)'}">${dataDisk1Pass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>数据盘2:</strong></td>
                    <td style="padding:5px;">${dataDisk2}TB (要求: ≥${standard.dataDisk2}TB)</td>
                    <td style="padding:5px; color:${dataDisk2Pass ? 'var(--success)' : 'var(--danger)'}">${dataDisk2Pass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>` : `
                <tr>
                    <td style="padding:5px;"><strong>数据盘:</strong></td>
                    <td style="padding:5px;">${dataDisk}TB (要求: ≥${standard.dataDisk}TB)</td>
                    <td style="padding:5px; color:${dataDiskPass ? 'var(--success)' : 'var(--danger)'}">${dataDiskPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>`}
                <tr>
                    <td style="padding:5px;"><strong>千兆电口:</strong></td>
                    <td style="padding:5px;">${gigabitPorts}个 (要求: ≥${standard.gigabitPorts}个)</td>
                    <td style="padding:5px; color:${gigabitPortsPass ? 'var(--success)' : 'var(--danger)'}">${gigabitPortsPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>万兆光口:</strong></td>
                    <td style="padding:5px;">${tenGigabitPorts}个 (要求: ≥${standard.tenGigabitPorts}个)</td>
                    <td style="padding:5px; color:${tenGigabitPortsPass ? 'var(--success)' : 'var(--danger)'}">${tenGigabitPortsPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>RAID卡:</strong></td>
                    <td style="padding:5px;">${raid} (要求: ${standard.raid.join('或')})</td>
                    <td style="padding:5px; color:${raidMatch ? 'var(--success)' : 'var(--danger)'}">${raidMatch ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
        `;
        
        if(type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
            resultHTML += `
                <tr>
                    <td style="padding:5px;"><strong>显卡型号:</strong></td>
                    <td style="padding:5px;">${gpuType} (要求: ${standard.gpuType.join('/')})</td>
                    <td style="padding:5px; color:${gpuTypePass ? 'var(--success)' : 'var(--danger)'}">${gpuTypePass ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>显卡数量:</strong></td>
                    <td style="padding:5px;">${gpuCount}块 (要求: ≥${standard.gpuCount}块)</td>
                    <td style="padding:5px; color:${gpuCountPass ? 'var(--success)' : 'var(--danger)'}">${gpuCountPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
            `;
        }
        
        resultHTML += `</table>`;
        resultText.innerHTML = resultHTML;
    } 
    // 情况2：硬件参数达标但RAID卡或GPU不匹配
    else if (hardwarePass && (!raidMatch || ((type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') && !gpuTypePass))) {
        resultBox.className = 'result-box result-warning';
        let resultHTML = `
            <i class="fas fa-exclamation-circle"></i> <strong>硬件参数达标但部分组件不匹配，需要定制适配。</strong>
            <br><br>
            <table style="width:100%; border-collapse: collapse;">
                <tr>
                    <td style="padding:5px;"><strong>CPU:</strong></td>
                    <td style="padding:5px;">${cpu}核 (要求: ≥${standard.cpu}核)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>内存:</strong></td>
                    <td style="padding:5px;">${memory}GB (要求: ≥${standard.memory}GB)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>系统盘:</strong></td>
                    <td style="padding:5px;">${systemDisk}GB (要求: ≥${standard.systemDisk}GB)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>数据盘:</strong></td>
                    <td style="padding:5px;">${dataDisk}TB (要求: ≥${standard.dataDisk}TB)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>千兆电口:</strong></td>
                    <td style="padding:5px;">${gigabitPorts}个 (要求: ≥${standard.gigabitPorts}个)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>万兆光口:</strong></td>
                    <td style="padding:5px;">${tenGigabitPorts}个 (要求: ≥${standard.tenGigabitPorts}个)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>RAID卡:</strong></td>
                    <td style="padding:5px;">${raid} (要求: ${standard.raid.join('或')})</td>
                    <td style="padding:5px; color:${raidMatch ? 'var(--success)' : 'var(--danger)'}">${raidMatch ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
        `;
        
        if(type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
            resultHTML += `
                <tr>
                    <td style="padding:5px;"><strong>显卡型号:</strong></td>
                    <td style="padding:5px;">${gpuType} (要求: ${standard.gpuType.join('/')})</td>
                    <td style="padding:5px; color:${gpuTypePass ? 'var(--success)' : 'var(--danger)'}">${gpuTypePass ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>显卡数量:</strong></td>
                    <td style="padding:5px;">${gpuCount}块 (要求: ≥${standard.gpuCount}块)</td>
                    <td style="padding:5px; color:${gpuCountPass ? 'var(--success)' : 'var(--danger)'}">${gpuCountPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
            `;
        }
        
        resultHTML += `</table><br><p>请联系技术支持团队进行定制适配。</p>`;
        resultText.innerHTML = resultHTML;
    } 
    // 情况3：硬件参数不达标
    else {
        resultBox.className = 'result-box result-error';
        let resultHTML = `
            <i class="fas fa-times-circle"></i> <strong>硬件配置不符合要求，无法部署。</strong>
            <br><br>
            <table style="width:100%; border-collapse: collapse;">
                <tr>
                    <td style="padding:5px;"><strong>CPU:</strong></td>
                    <td style="padding:5px;">${cpu}核 (要求: ≥${standard.cpu}核)</td>
                    <td style="padding:5px; color:${cpuPass ? 'var(--success)' : 'var(--danger)'}">${cpuPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>内存:</strong></td>
                    <td style="padding:5px;">${memory}GB (要求: ≥${standard.memory}GB)</td>
                    <td style="padding:5px; color:${memoryPass ? 'var(--success)' : 'var(--danger)'}">${memoryPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>系统盘:</strong></td>
                    <td style="padding:5px;">${systemDisk}GB (要求: ≥${standard.systemDisk}GB)</td>
                    <td style="padding:5px; color:${systemDiskPass ? 'var(--success)' : 'var(--danger)'}">${systemDiskPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                ${(type === 'data-base' || type === 'ai-platform' || type === 'aicp') ? `
                <tr>
                    <td style="padding:5px;"><strong>数据盘1:</strong></td>
                    <td style="padding:5px;">${dataDisk1}TB (要求: ≥${standard.dataDisk1}TB)</td>
                    <td style="padding:5px; color:${dataDisk1Pass ? 'var(--success)' : 'var(--danger)'}">${dataDisk1Pass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>数据盘2:</strong></td>
                    <td style="padding:5px;">${dataDisk2}TB (要求: ≥${standard.dataDisk2}TB)</td>
                    <td style="padding:5px; color:${dataDisk2Pass ? 'var(--success)' : 'var(--danger)'}">${dataDisk2Pass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>` : `
                <tr>
                    <td style="padding:5px;"><strong>数据盘:</strong></td>
                    <td style="padding:5px;">${dataDisk}TB (要求: ≥${standard.dataDisk}TB)</td>
                    <td style="padding:5px; color:${dataDiskPass ? 'var(--success)' : 'var(--danger)'}">${dataDiskPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>`}
                <tr>
                    <td style="padding:5px;"><strong>千兆电口:</strong></td>
                    <td style="padding:5px;">${gigabitPorts}个 (要求: ≥${standard.gigabitPorts}个)</td>
                    <td style="padding:5px; color:${gigabitPortsPass ? 'var(--success)' : 'var(--danger)'}">${gigabitPortsPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>万兆光口:</strong></td>
                    <td style="padding:5px;">${tenGigabitPorts}个 (要求: ≥${standard.tenGigabitPorts}个)</td>
                    <td style="padding:5px; color:${tenGigabitPortsPass ? 'var(--success)' : 'var(--danger)'}">${tenGigabitPortsPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>RAID卡:</strong></td>
                    <td style="padding:5px;">${raid} (要求: ${standard.raid.join('或')})</td>
                    <td style="padding:5px; color:${raidMatch ? 'var(--success)' : 'var(--danger)'}">${raidMatch ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
        `;
        
        if(type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
            resultHTML += `
                <tr>
                    <td style="padding:5px;"><strong>显卡型号:</strong></td>
                    <td style="padding:5px;">${gpuType} (要求: ${standard.gpuType.join('/')})</td>
                    <td style="padding:5px; color:${gpuTypePass ? 'var(--success)' : 'var(--danger)'}">${gpuTypePass ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>显卡数量:</strong></td>
                    <td style="padding:5px;">${gpuCount}块 (要求: ≥${standard.gpuCount}块)</td>
                    <td style="padding:5px; color:${gpuCountPass ? 'var(--success)' : 'var(--danger)'}">${gpuCountPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
            `;
        }
        
        resultHTML += `</table><br><p>硬件配置不满足最低要求，无法部署。</p>`;
        resultText.innerHTML = resultHTML;
    }
    
    resultBox.style.display = 'block';
}

// XDR+GPT部署方案兼容性检测
function checkXDRGPTCompatibility(type) {
    const resultBox = safeGetElementById('compatibility-result');
    const resultText = safeGetElementById('result-text');
    
    if (!resultBox || !resultText) {
        console.error('XDR+GPT compatibility result elements not found');
        return;
    }
    
    // 获取输入值
    const cpuInput = safeGetElementById(`xdr-gpt-${type}-cpu-info`);
    const memoryInput = safeGetElementById(`xdr-gpt-${type}-memory-info`);
    const systemDiskInput = safeGetElementById(`xdr-gpt-${type}-system-disk`);
    const dataDiskInput = safeGetElementById(`xdr-gpt-${type}-data-disk`);
    const gigabitPortsInput = safeGetElementById(`xdr-gpt-${type}-gigabit-ports`);
    const tenGigabitPortsInput = safeGetElementById(`xdr-gpt-${type}-10g-ports`);
    const raidInput = safeGetElementById(`xdr-gpt-${type}-raid-info`);
    
    const cpu = cpuInput ? parseInt(cpuInput.value) || 0 : 0;
    const memory = memoryInput ? parseInt(memoryInput.value) || 0 : 0;
    const systemDisk = systemDiskInput ? parseInt(systemDiskInput.value) || 0 : 0;
    const dataDisk = dataDiskInput ? parseInt(dataDiskInput.value) || 0 : 0;
    const gigabitPorts = gigabitPortsInput ? parseInt(gigabitPortsInput.value) || 0 : 0;
    const tenGigabitPorts = tenGigabitPortsInput ? parseInt(tenGigabitPortsInput.value) || 0 : 0;
    const raid = raidInput ? raidInput.value.trim().toLowerCase() : '';
    
    // GPT特有参数
    let gpuType = "";
    let gpuCount = 0;
    if(type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
        const gpuTypeInput = safeGetElementById(`xdr-gpt-${type}-gpu-type`);
        const gpuCountInput = safeGetElementById(`xdr-gpt-${type}-gpu-count`);
        gpuType = gpuTypeInput ? gpuTypeInput.value.trim().toLowerCase() : '';
        gpuCount = gpuCountInput ? parseInt(gpuCountInput.value) || 0 : 0;
    }
    
    // 获取标准配置
    const standard = hardwareStandards[type];
    
    // 检查各项参数
    const cpuPass = cpu >= standard.cpu;
    const memoryPass = memory >= standard.memory;
    const systemDiskPass = systemDisk >= standard.systemDisk;
    const dataDiskPass = dataDisk >= standard.dataDisk;
    const gigabitPortsPass = gigabitPorts >= standard.gigabitPorts;
    const tenGigabitPortsPass = tenGigabitPorts >= standard.tenGigabitPorts;
    
    // 为了保持模板的一致性，定义未使用的变量
    const dataDisk1Pass = true;
    const dataDisk2Pass = true;
    const dataDisk1 = 0;
    const dataDisk2 = 0;
    
    // 检查RAID卡是否匹配（支持多种型号）
    const raidMatch = standard.raid.some(card => 
        raid.includes(card.toLowerCase())
    );
    
    // GPU特有检查（GPT）
    let gpuTypePass = true;
    let gpuCountPass = true;
    if(type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
        gpuTypePass = standard.gpuType.includes(gpuType);
        // 对于运营GPT，显卡数量必须是4、6、8
        if (type === 'operation-gpt') {
            gpuCountPass = [4, 6, 8].includes(gpuCount);
        } else {
            gpuCountPass = gpuCount >= standard.gpuCount;
        }
    }
    
    // 检查所有硬件参数是否达标（不包括RAID卡和GPU）
    let hardwarePass = cpuPass && memoryPass && systemDiskPass && 
                       dataDiskPass && gigabitPortsPass && tenGigabitPortsPass;
    
    // 对于GPT，显卡数量是否达标也计入硬件参数
    if (type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
        hardwarePass = hardwarePass && gpuCountPass;
    }
    
    // 情况1：完全符合，包括RAID卡和GPU(如果适用)
    if (hardwarePass && raidMatch && (type !== 'gpt' && type !== 'operation-gpt' && type !== 'operation-traffic-gpt' || 
        ((type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') && gpuTypePass))) {
        resultBox.className = 'result-box result-success';
        let resultHTML = `
            <i class="fas fa-check-circle"></i> <strong>硬件配置完全符合要求，可以直接部署。</strong>
            <br><br>
            <table style="width:100%; border-collapse: collapse;">
                <tr>
                    <td style="padding:5px;"><strong>CPU:</strong></td>
                    <td style="padding:5px;">${cpu}核 (要求: ≥${standard.cpu}核)</td>
                    <td style="padding:5px; color:${cpuPass ? 'var(--success)' : 'var(--danger)'}">${cpuPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>内存:</strong></td>
                    <td style="padding:5px;">${memory}GB (要求: ≥${standard.memory}GB)</td>
                    <td style="padding:5px; color:${memoryPass ? 'var(--success)' : 'var(--danger)'}">${memoryPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>系统盘:</strong></td>
                    <td style="padding:5px;">${systemDisk}GB (要求: ≥${standard.systemDisk}GB)</td>
                    <td style="padding:5px; color:${systemDiskPass ? 'var(--success)' : 'var(--danger)'}">${systemDiskPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                ${(type === 'data-base' || type === 'ai-platform' || type === 'aicp') ? `
                <tr>
                    <td style="padding:5px;"><strong>数据盘1:</strong></td>
                    <td style="padding:5px;">${dataDisk1}TB (要求: ≥${standard.dataDisk1}TB)</td>
                    <td style="padding:5px; color:${dataDisk1Pass ? 'var(--success)' : 'var(--danger)'}">${dataDisk1Pass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>数据盘2:</strong></td>
                    <td style="padding:5px;">${dataDisk2}TB (要求: ≥${standard.dataDisk2}TB)</td>
                    <td style="padding:5px; color:${dataDisk2Pass ? 'var(--success)' : 'var(--danger)'}">${dataDisk2Pass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>` : `
                <tr>
                    <td style="padding:5px;"><strong>数据盘:</strong></td>
                    <td style="padding:5px;">${dataDisk}TB (要求: ≥${standard.dataDisk}TB)</td>
                    <td style="padding:5px; color:${dataDiskPass ? 'var(--success)' : 'var(--danger)'}">${dataDiskPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>`}
                <tr>
                    <td style="padding:5px;"><strong>千兆电口:</strong></td>
                    <td style="padding:5px;">${gigabitPorts}个 (要求: ≥${standard.gigabitPorts}个)</td>
                    <td style="padding:5px; color:${gigabitPortsPass ? 'var(--success)' : 'var(--danger)'}">${gigabitPortsPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>万兆光口:</strong></td>
                    <td style="padding:5px;">${tenGigabitPorts}个 (要求: ≥${standard.tenGigabitPorts}个)</td>
                    <td style="padding:5px; color:${tenGigabitPortsPass ? 'var(--success)' : 'var(--danger)'}">${tenGigabitPortsPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>RAID卡:</strong></td>
                    <td style="padding:5px;">${raid} (要求: ${standard.raid.join('或')})</td>
                    <td style="padding:5px; color:${raidMatch ? 'var(--success)' : 'var(--danger)'}">${raidMatch ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
        `;
        
        if(type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
            resultHTML += `
                <tr>
                    <td style="padding:5px;"><strong>显卡型号:</strong></td>
                    <td style="padding:5px;">${gpuType} (要求: ${standard.gpuType.join('/')})</td>
                    <td style="padding:5px; color:${gpuTypePass ? 'var(--success)' : 'var(--danger)'}">${gpuTypePass ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>显卡数量:</strong></td>
                    <td style="padding:5px;">${gpuCount}块 (要求: ≥${standard.gpuCount}块)</td>
                    <td style="padding:5px; color:${gpuCountPass ? 'var(--success)' : 'var(--danger)'}">${gpuCountPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
            `;
        }
        
        resultHTML += `</table>`;
        resultText.innerHTML = resultHTML;
    } 
    // 情况2：硬件参数达标但RAID卡或GPU不匹配
    else if (hardwarePass && (!raidMatch || ((type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') && !gpuTypePass))) {
        resultBox.className = 'result-box result-warning';
        let resultHTML = `
            <i class="fas fa-exclamation-circle"></i> <strong>硬件参数达标但部分组件不匹配，需要定制适配。</strong>
            <br><br>
            <table style="width:100%; border-collapse: collapse;">
                <tr>
                    <td style="padding:5px;"><strong>CPU:</strong></td>
                    <td style="padding:5px;">${cpu}核 (要求: ≥${standard.cpu}核)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>内存:</strong></td>
                    <td style="padding:5px;">${memory}GB (要求: ≥${standard.memory}GB)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>系统盘:</strong></td>
                    <td style="padding:5px;">${systemDisk}GB (要求: ≥${standard.systemDisk}GB)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>数据盘:</strong></td>
                    <td style="padding:5px;">${dataDisk}TB (要求: ≥${standard.dataDisk}TB)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>千兆电口:</strong></td>
                    <td style="padding:5px;">${gigabitPorts}个 (要求: ≥${standard.gigabitPorts}个)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>万兆光口:</strong></td>
                    <td style="padding:5px;">${tenGigabitPorts}个 (要求: ≥${standard.tenGigabitPorts}个)</td>
                    <td style="padding:5px; color:var(--success)">✓ 达标</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>RAID卡:</strong></td>
                    <td style="padding:5px;">${raid} (要求: ${standard.raid.join('或')})</td>
                    <td style="padding:5px; color:${raidMatch ? 'var(--success)' : 'var(--danger)'}">${raidMatch ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
        `;
        
        if(type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
            resultHTML += `
                <tr>
                    <td style="padding:5px;"><strong>显卡型号:</strong></td>
                    <td style="padding:5px;">${gpuType} (要求: ${standard.gpuType.join('/')})</td>
                    <td style="padding:5px; color:${gpuTypePass ? 'var(--success)' : 'var(--danger)'}">${gpuTypePass ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>显卡数量:</strong></td>
                    <td style="padding:5px;">${gpuCount}块 (要求: ≥${standard.gpuCount}块)</td>
                    <td style="padding:5px; color:${gpuCountPass ? 'var(--success)' : 'var(--danger)'}">${gpuCountPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
            `;
        }
        
        resultHTML += `</table><br><p>请联系技术支持团队进行定制适配。</p>`;
        resultText.innerHTML = resultHTML;
    } 
    // 情况3：硬件参数不达标
    else {
        resultBox.className = 'result-box result-error';
        let resultHTML = `
            <i class="fas fa-times-circle"></i> <strong>硬件配置不符合要求，无法部署。</strong>
            <br><br>
            <table style="width:100%; border-collapse: collapse;">
                <tr>
                    <td style="padding:5px;"><strong>CPU:</strong></td>
                    <td style="padding:5px;">${cpu}核 (要求: ≥${standard.cpu}核)</td>
                    <td style="padding:5px; color:${cpuPass ? 'var(--success)' : 'var(--danger)'}">${cpuPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>内存:</strong></td>
                    <td style="padding:5px;">${memory}GB (要求: ≥${standard.memory}GB)</td>
                    <td style="padding:5px; color:${memoryPass ? 'var(--success)' : 'var(--danger)'}">${memoryPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>系统盘:</strong></td>
                    <td style="padding:5px;">${systemDisk}GB (要求: ≥${standard.systemDisk}GB)</td>
                    <td style="padding:5px; color:${systemDiskPass ? 'var(--success)' : 'var(--danger)'}">${systemDiskPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                ${(type === 'data-base' || type === 'ai-platform' || type === 'aicp') ? `
                <tr>
                    <td style="padding:5px;"><strong>数据盘1:</strong></td>
                    <td style="padding:5px;">${dataDisk1}TB (要求: ≥${standard.dataDisk1}TB)</td>
                    <td style="padding:5px; color:${dataDisk1Pass ? 'var(--success)' : 'var(--danger)'}">${dataDisk1Pass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>数据盘2:</strong></td>
                    <td style="padding:5px;">${dataDisk2}TB (要求: ≥${standard.dataDisk2}TB)</td>
                    <td style="padding:5px; color:${dataDisk2Pass ? 'var(--success)' : 'var(--danger)'}">${dataDisk2Pass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>` : `
                <tr>
                    <td style="padding:5px;"><strong>数据盘:</strong></td>
                    <td style="padding:5px;">${dataDisk}TB (要求: ≥${standard.dataDisk}TB)</td>
                    <td style="padding:5px; color:${dataDiskPass ? 'var(--success)' : 'var(--danger)'}">${dataDiskPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>`}
                <tr>
                    <td style="padding:5px;"><strong>千兆电口:</strong></td>
                    <td style="padding:5px;">${gigabitPorts}个 (要求: ≥${standard.gigabitPorts}个)</td>
                    <td style="padding:5px; color:${gigabitPortsPass ? 'var(--success)' : 'var(--danger)'}">${gigabitPortsPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>万兆光口:</strong></td>
                    <td style="padding:5px;">${tenGigabitPorts}个 (要求: ≥${standard.tenGigabitPorts}个)</td>
                    <td style="padding:5px; color:${tenGigabitPortsPass ? 'var(--success)' : 'var(--danger)'}">${tenGigabitPortsPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>RAID卡:</strong></td>
                    <td style="padding:5px;">${raid} (要求: ${standard.raid.join('或')})</td>
                    <td style="padding:5px; color:${raidMatch ? 'var(--success)' : 'var(--danger)'}">${raidMatch ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
        `;
        
        if(type === 'gpt' || type === 'operation-gpt' || type === 'operation-traffic-gpt') {
            resultHTML += `
                <tr>
                    <td style="padding:5px;"><strong>显卡型号:</strong></td>
                    <td style="padding:5px;">${gpuType} (要求: ${standard.gpuType.join('/')})</td>
                    <td style="padding:5px; color:${gpuTypePass ? 'var(--success)' : 'var(--danger)'}">${gpuTypePass ? '✓ 匹配' : '✗ 不匹配'}</td>
                </tr>
                <tr>
                    <td style="padding:5px;"><strong>显卡数量:</strong></td>
                    <td style="padding:5px;">${gpuCount}块 (要求: ≥${standard.gpuCount}块)</td>
                    <td style="padding:5px; color:${gpuCountPass ? 'var(--success)' : 'var(--danger)'}">${gpuCountPass ? '✓ 达标' : '✗ 不足'}</td>
                </tr>
            `;
        }
        
        resultHTML += `</table><br><p>硬件配置不满足最低要求，无法部署。</p>`;
        resultText.innerHTML = resultHTML;
    }
    
    resultBox.style.display = 'block';
}

// 标记/取消标记步骤完成
function completeStep(stepId) {
    const step = safeGetElementById(stepId);
    if (!step) return;
    
    const isCompleted = step.classList.contains('completed');
    
    if(isCompleted) {
        step.classList.remove('completed');
    } else {
        step.classList.add('completed');
    }
    
    updateProgress();
}

function updateProgress() {
    const completedSteps = safeQuerySelectorAll('.step.completed');
    const totalSteps = safeQuerySelectorAll('.step');
    const progress = totalSteps.length > 0 ? Math.round((completedSteps.length / totalSteps.length) * 100) : 0;
    
    const progressText = safeGetElementById('progress-text');
    if (progressText) {
        progressText.textContent = `${progress}%`;
    }
    
    const statusIndicator = safeQuerySelector('.status-indicator');
    if (statusIndicator) {
        if(progress === 100) {
            statusIndicator.className = 'status-indicator status-active';
        } else if(progress > 0) {
            statusIndicator.className = 'status-indicator status-warning';
        } else {
            statusIndicator.className = 'status-indicator';
        }
    }
}

// 切换模块展开/收起状态
function toggleSection(section) {
    const content = section.querySelector('.scenario-content') || 
                    section.querySelector('.hardware-content') || 
                    section.querySelector('.virtualization-content') || 
                    section.querySelector('.guide-content') ||
                    section.querySelector('.compatibility-check-content');
    
    const toggleBtn = section.querySelector('.toggle-btn');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    } else {
        content.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    }
}

// 切换兼容性检测展开/收起状态
function toggleCompatibilityCheck() {
    const content = safeQuerySelector('.compatibility-check-content');
    const toggleBtn = safeQuerySelector('.compatibility-check .toggle-btn');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    } else {
        content.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    }
}

// 滚动到指定模块
function scrollToSection(sectionId) {
    const section = safeGetElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// DOM工具函数 - 安全地获取DOM元素
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (e) {
        console.error(`Element not found: ${selector}`, e);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (e) {
        console.error(`Elements not found: ${selector}`, e);
        return [];
    }
}

function safeGetElementById(id) {
    try {
        return document.getElementById(id);
    } catch (e) {
        console.error(`Element not found: ${id}`, e);
        return null;
    }
}

// 事件绑定系统
function bindEvents() {
    // 导航链接事件
    const navLinks = safeQuerySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const section = this.dataset.section;
            if (section) {
                scrollToSection(section);
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 部署方案选择事件
    bindScenarioEvents();
    
    // 硬件检测事件
    bindHardwareEvents();
    
    // 按钮点击事件
    bindButtonEvents();
    
    // 标签页切换事件
    bindTabEvents();
}

// 绑定场景选择相关事件
function bindScenarioEvents() {
    // 场景头部切换
    const scenarioHeaders = safeQuerySelectorAll('[data-action="toggle-section"]');
    scenarioHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentNode;
            if (section) {
                toggleSection(section);
            }
        });
    });

    // 场景选项切换
    const scenarioOptions = safeQuerySelectorAll('[data-action="toggle-scenario"]');
    scenarioOptions.forEach(option => {
        option.addEventListener('click', function() {
            const scenario = this.dataset.scenario;
            if (scenario) {
                toggleScenario(scenario);
            }
        });
    });

    // 确认场景按钮
    const confirmBtn = safeQuerySelector('[data-action="confirm-scenarios"]');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmScenarios);
    }

    // 场景卡片选择
    const scenarioCards = safeQuerySelectorAll('[data-action="select-scenario"]');
    scenarioCards.forEach(card => {
        card.addEventListener('click', function() {
            const scenario = this.dataset.scenario;
            if (scenario) {
                selectScenario(scenario);
            }
        });
    });

    // 查看详情按钮
    const detailBtns = safeQuerySelectorAll('[data-action="view-details"]');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.stopPropagation();
            const scenario = this.dataset.scenario;
            if (scenario) {
                viewDetails(scenario, event);
            }
        });
    });
}

// 绑定硬件检测相关事件
function bindHardwareEvents() {
    // 硬件标签页切换
    const hardwareTabs = safeQuerySelectorAll('[data-action="switch-hardware-tab"]');
    hardwareTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            if (tabId) {
                switchHardwareTab(tabId);
            }
        });
    });

    // AI安全平台标签页切换
    const aiSecurityTabs = safeQuerySelectorAll('[data-action="switch-ai-security-tab"]');
    aiSecurityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            if (tabId) {
                switchAISecurityTab(tabId);
            }
        });
    });

    // XDR+GPT标签页切换
    const xdrGptTabs = safeQuerySelectorAll('[data-action="switch-xdr-gpt-tab"]');
    xdrGptTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            if (tabId) {
                switchXDRGPTTab(tabId);
            }
        });
    });

    // 兼容性检测按钮
    const checkBtns = safeQuerySelectorAll('[data-action="check-compatibility"]');
    checkBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            if (type) {
                checkCompatibility(type);
            }
        });
    });

    // XDR+GPT兼容性检测按钮
    const xdrGptCheckBtns = safeQuerySelectorAll('[data-action="check-xdr-gpt-compatibility"]');
    xdrGptCheckBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            if (type) {
                checkXDRGPTCompatibility(type);
            }
        });
    });

    // 兼容性检测切换
    const compatibilityCheckHeaders = safeQuerySelectorAll('[data-action="toggle-compatibility-check"]');
    compatibilityCheckHeaders.forEach(header => {
        header.addEventListener('click', toggleCompatibilityCheck);
    });
}

// 绑定按钮事件
function bindButtonEvents() {
    // 外链按钮
    const urlBtns = safeQuerySelectorAll('[data-action="open-url"]');
    urlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const url = this.dataset.url;
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // 返回按钮
    const backBtns = safeQuerySelectorAll('[data-action="back-to-selection"]');
    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            if (type === 'data-base') {
                backToDataBaseSelection();
            } else {
                backToScenarioSelection();
            }
        });
    });

    // 完成步骤按钮
    const stepBtns = safeQuerySelectorAll('[data-action="complete-step"]');
    stepBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const step = this.dataset.step;
            if (step) {
                completeStep(step);
            }
        });
    });
}

// 绑定动态生成元素的事件
function bindDynamicEvents() {
    // 标签页切换事件 
    const detailTabs = safeQuerySelectorAll('[data-action="open-detail-tab"]');
    detailTabs.forEach(tab => {
        // 移除之前的事件监听器（如果有）
        tab.removeEventListener('click', handleDetailTabClick);
        tab.addEventListener('click', handleDetailTabClick);
    });
    
    const dataBaseTabs = safeQuerySelectorAll('[data-action="open-data-base-tab"]');
    dataBaseTabs.forEach(tab => {
        tab.removeEventListener('click', handleDataBaseTabClick);
        tab.addEventListener('click', handleDataBaseTabClick);
    });

    // 步骤完成按钮事件
    const stepBtns = safeQuerySelectorAll('[data-action="complete-step"]');
    stepBtns.forEach(btn => {
        btn.removeEventListener('click', handleCompleteStep);
        btn.addEventListener('click', handleCompleteStep);
    });

    // 外链按钮事件
    const urlBtns = safeQuerySelectorAll('[data-action="open-url"]');
    urlBtns.forEach(btn => {
        btn.removeEventListener('click', handleOpenUrl);
        btn.addEventListener('click', handleOpenUrl);
    });

    // 返回按钮事件
    const backBtns = safeQuerySelectorAll('[data-action="back-to-selection"]');
    backBtns.forEach(btn => {
        btn.removeEventListener('click', handleBackToSelection);
        btn.addEventListener('click', handleBackToSelection);
    });
}

// 事件处理函数
function handleDetailTabClick(event) {
    const tabId = this.dataset.tab;
    if (tabId) {
        openDetailTab(tabId, event);
    }
}

function handleDataBaseTabClick(event) {
    const tabId = this.dataset.tab;
    if (tabId) {
        openDataBaseTab(tabId, event);
    }
}

function handleCompleteStep() {
    const step = this.dataset.step;
    if (step) {
        completeStep(step);
    }
}

function handleOpenUrl() {
    const url = this.dataset.url;
    if (url) {
        window.open(url, '_blank');
    }
}

function handleBackToSelection() {
    const type = this.dataset.type;
    if (type === 'data-base') {
        backToDataBaseSelection();
    } else {
        backToScenarioSelection();
    }
}

// 绑定标签页事件
function bindTabEvents() {
    // 主标签页
    const tabs = safeQuerySelectorAll('[data-action="open-tab"]');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            const tabId = this.dataset.tab;
            if (tabId) {
                openTab(tabId, event);
            }
        });
    });
    
    // 部署详情标签页
    const detailTabs = safeQuerySelectorAll('[data-action="open-detail-tab"]');
    detailTabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            const tabId = this.dataset.tab;
            if (tabId) {
                openDetailTab(tabId, event);
            }
        });
    });
    
    // 数据底座标签页
    const dataBaseTabs = safeQuerySelectorAll('[data-action="open-data-base-tab"]');
    dataBaseTabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            const tabId = this.dataset.tab;
            if (tabId) {
                openDataBaseTab(tabId, event);
            }
        });
    });
}

// 全局错误处理
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
    console.error('Error details:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

// 验证关键DOM元素是否存在
function validateCriticalElements() {
    const criticalElements = [
        'deployment-scenario',
        'deployment-recommendation', 
        'compatibility-detection',
        'xdr-gpt-section',
        'ai-platform-section'
    ];
    
    const missingElements = [];
    criticalElements.forEach(id => {
        if (!safeGetElementById(id)) {
            missingElements.push(id);
        }
    });
    
    if (missingElements.length > 0) {
        console.warn('Missing critical elements:', missingElements);
        return false;
    }
    
    return true;
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    try {
        // 验证关键元素
        if (!validateCriticalElements()) {
            console.error('Critical DOM elements missing, extension may not work properly');
        }
        
        // 绑定所有事件
        bindEvents();
        
        // 默认选择XDR场景
        selectScenario('xdr');
        
        // 初始化虚拟化部署标签 - 安全调用
        if (typeof switchVirtualizationTab === 'function') {
            try {
                switchVirtualizationTab('xdr');
            } catch (e) {
                console.warn('switchVirtualizationTab not available:', e);
            }
        }
        
        // 初始化AI安全平台检测标签 - 安全调用
        if (typeof switchAISecurityTab === 'function') {
            try {
                switchAISecurityTab('data-base');
            } catch (e) {
                console.warn('switchAISecurityTab not available:', e);
            }
        }
        
        console.log('Extension initialized successfully');
        
    } catch (error) {
        console.error('Error during extension initialization:', error);
    }
});

// 返回方案选择
function backToScenarioSelection() {
    // 隐藏部署详情
    const recommendation = safeGetElementById('deployment-recommendation');
    if (recommendation) {
        recommendation.style.display = 'none';
    }
    
    // 重新显示所有场景卡片
    const cards = safeQuerySelectorAll('.scenario-card');
    cards.forEach(card => {
        card.style.display = 'block';
    });
    
    // 移除部署详情内容
    const detailContent = safeQuerySelector('.deployment-details');
    if (detailContent) {
        detailContent.remove();
    }
}
